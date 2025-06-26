import react from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import NavBar from "./NavBar";
import KanjiModal from "./KanjiModal";

const capitalizeFirst = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function KanjiCategory() {
  const { category } = useParams();
  const [kanjiList, setKanjiList] = useState([]);
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://kanjiapi.dev/v1/kanji/${category}`)
      .then((res) => setKanjiList(res.data))
      .catch((err) => console.error(err));
  }, [category]);

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch(
        `https://kanjai-backend.onrender.com/kanji/${selectedKanji.character}/mylist`,
        { method: "PATCH" }
      );

      const updatedKanji = await response.json();

      setSelectedKanji((prev) => ({
        ...prev,
        favorited: updatedKanji.favorited,
      }));
    } catch (error) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <>
      <div>
        <h1 className="flex justify-center font-[DM_Sans] font-black text-6xl bg-gray-100 h-50 items-center">
          {capitalizeFirst(category)} Kanji
        </h1>
        <ul className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-y-10 gap-x-22 w-fit mx-auto py-10 font-[Noto_Sans_JP] font-normal text-4xl">
          {kanjiList.map((kanji, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedKanji({ character: kanji });
                setModalOpen(true);
              }}
              className="cursor-pointer"
            >
              {kanji}
            </li>
          ))}
        </ul>
      </div>

      <KanjiModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        kanji={selectedKanji}
        favorited={selectedKanji?.favorited}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
}

export default KanjiCategory;
