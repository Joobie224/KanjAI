const express = require("express")
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai")
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const axios = require("axios");

dotenv.config();

app.use(express.json())
app.use(cors())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.post("/api/mnemonic", async (req, res) => {
    const { kanji } = req.body;

    if (!kanji) {
        return res.status(400).json({ error: "Kanji is required." })
    }

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "user", content: `generate a memorable mnemonic for beginners. using the shape of kanji, history of the kanji, or any other relevant information about the kanji, create an ACCURATE mnemonic for the kanji "${kanji}"` }
            ]
        })

        const mnemonic = completion.choices[0].message.content.trim();
        res.json({ mnemonic });
    } catch (error) {
        console.error("OpenAI error:", error.message);
        res.status(500).json({ error: "Failed to generate mnemonic." })
    }
})

app.post("/api/ask", async (req, res, next) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: "No question provided" })
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: question,
                },
            ],
        });

        const answer = response.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({ error: "Failed to generate answer." })
    }
})

app.get("/mylist", async (req, res, next) => {
    try {
        const favorites = await prisma.kanji.findMany({
            where: { favorited: true },
        });
        res.send(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.patch("/kanji/:character/mylist", async (req, res, next) => {
    const { character } = req.params;

    try {
        let kanji = await prisma.kanji.findUnique({ where: { character } });

        if (!kanji) {
            const apiResponse = await axios.get(`https://kanjiapi.dev/v1/kanji/${character}`);
            const { meanings, kun_readings, on_readings, stroke_count } = apiResponse.data;

            kanji = await prisma.kanji.create({
                data: {
                    character,
                    meaning: meanings,
                    kunReading: kun_readings,
                    onReading: on_readings,
                    strokeCount: stroke_count,
                    favorited: true,
                },
            });

            return res.send(kanji);
        }

        const updated = await prisma.kanji.update({
            where: { character },
            data: { favorited: !kanji.favorited },
        })

        res.send(updated);
    } catch (error) {
        console.error("Error toggling favorite:", error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.listen(3000);