import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  maxHeight: "100vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

function KanjiModal({ open, onClose, kanji, favorited, onToggleFavorite }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mnemonic, setMnemonic] = useState("");
  const [mnemonicLoading, setMnemonicLoading] = useState(false);

  const generateMnemonic = async () => {
    setMnemonic("");
    setMnemonicLoading(true);
    try {
      const response = await axios.post(
        "https://kanjai-backend.onrender.com/api/mnemonic",
        {
          kanji: kanji.character,
        }
      );

      setMnemonic(response.data.mnemonic);
    } catch (error) {
      console.error("Error generating mnemonic:", error);
      setMnemonic("Failed to generate mnemonic.");
    } finally {
      setMnemonicLoading(false);
    }
  };

  useEffect(() => {
    if (kanji && open) {
      setLoading(true);
      setMnemonic("");
      axios
        .get(`https://kanjiapi.dev/v1/kanji/${kanji.character}`)
        .then((res) => setData(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [kanji, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...style,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
            width="100%"
          >
            <CircularProgress />
          </Box>
        ) : data ? (
          <Box
            display="flex"
            flexDirection="row"
            gap={4}
            height="100%"
            width="100%"
          >
            <Box
              width="50%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                fontWeight="bold"
                sx={{ fontSize: "10rem", fontFamily: "Noto Sans JP" }}
              >
                {kanji.character}
              </Typography>
            </Box>
            <Box flex={1} overflow="auto" pr={2} py={5}>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                }}
                py={1}
              >
                <strong>Meaning:</strong> {data.meanings?.join(", ")}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                }}
                py={1}
              >
                <strong>On’yomi:</strong> {data.on_readings?.join("・")}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                }}
                py={1}
              >
                <strong>Kun’yomi:</strong> {data.kun_readings?.join("・")}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                }}
                py={1}
              >
                <strong>Stroke Count:</strong> {data.stroke_count}
              </Typography>
              <Box py={3}>
                <button
                  onClick={generateMnemonic}
                  disabled={mnemonicLoading}
                  style={{
                    padding: ".6rem 1rem",
                    fontSize: "1.2rem",
                    borderRadius: "100px",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {mnemonicLoading
                    ? "GPT4 is generating..."
                    : "Generate Mnemonic"}
                </button>
              </Box>
              <Box py={1}>
                <button
                  onClick={onToggleFavorite}
                  style={{
                    padding: ".6rem 1rem",
                    fontSize: "1.2rem",
                    borderRadius: "100px",
                    backgroundColor: favorited ? "#facc15" : "#e5e7eb",
                    color: "#111",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "1rem",
                  }}
                >
                  {favorited ? "★ In My List" : "☆ Add to My List"}
                </button>
              </Box>

              {mnemonic && (
                <Typography
                  mt={2}
                  variant="body1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontSize: "1.25rem",
                    backgroundColor: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "6px",
                  }}
                >
                  <strong>Mnemonic: </strong> {mnemonic}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Typography>No data found.</Typography>
        )}
      </Box>
    </Modal>
  );
}

export default KanjiModal;
