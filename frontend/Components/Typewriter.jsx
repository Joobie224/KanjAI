import React, { useState, useEffect } from "react";

const kanjiList = [
  { kanji: "日", meaning: "sun, day" },
  { kanji: "水", meaning: "water" },
  { kanji: "木", meaning: "tree" },
  { kanji: "火", meaning: "fire" },
  { kanji: "土", meaning: "earth, soil" },
  { kanji: "金", meaning: "gold, money" },
  { kanji: "月", meaning: "moon, month" },
  { kanji: "山", meaning: "mountain" },
  { kanji: "川", meaning: "river" },
  { kanji: "空", meaning: "sky, empty" },
  { kanji: "天", meaning: "heaven, sky" },
  { kanji: "生", meaning: "life, birth" },
  { kanji: "学", meaning: "study, learning" },
  { kanji: "先", meaning: "ahead, previous" },
  { kanji: "私", meaning: "I, private" },
  { kanji: "人", meaning: "person" },
  { kanji: "友", meaning: "friend" },
  { kanji: "名", meaning: "name" },
  { kanji: "本", meaning: "book, origin" },
  { kanji: "時", meaning: "time, hour" },
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [kanjiDisplay, setKanjiDisplay] = useState("");
  const [meaningDisplay, setMeaningDisplay] = useState("");
  const [stage, setStage] = useState("typing-kanji");

  useEffect(() => {
    const current = kanjiList[index];
    let timeout;

    if (stage === "typing-kanji") {
      if (kanjiDisplay.length < current.kanji.length) {
        timeout = setTimeout(() => {
          setKanjiDisplay(current.kanji.slice(0, kanjiDisplay.length + 1));
        }, 400);
      } else {
        setStage("typing-meaning");
      }
    }

    if (stage === "typing-meaning") {
      if (meaningDisplay.length < current.meaning.length) {
        timeout = setTimeout(() => {
          setMeaningDisplay(
            current.meaning.slice(0, meaningDisplay.length + 1)
          );
        }, 300);
      } else {
        timeout = setTimeout(() => {
          setStage("backspacing");
        }, 1500);
      }
    }

    if (stage === "backspacing") {
      if (meaningDisplay.length > 0) {
        timeout = setTimeout(() => {
          setMeaningDisplay((prev) => prev.slice(0, -1));
        }, 200);
      } else if (kanjiDisplay.length > 0) {
        timeout = setTimeout(() => {
          setKanjiDisplay((prev) => prev.slice(0, -1));
        }, 340);
      } else {
        setStage("typing-kanji");
        setIndex((prev) => (prev + 1) % kanjiList.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [stage, kanjiDisplay, meaningDisplay, index]);

  return (
    <div className="relative w-full h-50 bg-gray-100">
      <div className="flex flex-col items-center justify-center py-15 transition-all">
        <span
          className={`text-6xl font-[Noto_Sans_JP] text-black font-bold tracking-wider transition-opacity duration-500 ${
            kanjiDisplay === "" ? "opacity-0" : "opacity-100"
          }`}
        >
          {kanjiDisplay}
        </span>
        <div>
          <span className="text-xl text-gray-400 mt-4 tracking-wide">
            {meaningDisplay}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Typewriter;
