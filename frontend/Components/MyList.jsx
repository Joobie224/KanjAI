import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import KanjiModal from "./KanjiModal";

function MyList() {
  const [myList, setMyList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKanji, setSelectedKanji] = useState(null);

  useEffect(() => {
    axios
      .get("https://kanjai-backend.onrender.com/mylist")
      .then((res) => setMyList(res.data))
      .catch((err) => console.error("failed to fetch favorites:", err));
  }, []);

  return (
    <div>
      <h1 className="flex justify-center text-6xl font-[DM_Sans] font-black h-50 bg-gray-100 items-center">
        My Kanji List
      </h1>
      {myList.length === 0 ? (
        <p className="py-6 px-4 font-[DM_Sans] font-regular text-xl pb-84">
          No favorited kanji yet.
        </p>
      ) : (
        <ul className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-y-10 gap-x-22 w-fit mx-auto py-10 font-[Noto_Sans_JP] font-normal text-4xl">
          {myList.map((kanjiObj) => (
            <li
              key={kanjiObj.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedKanji(kanjiObj);
                setModalOpen(true);
              }}
            >
              {kanjiObj.character}
            </li>
          ))}
        </ul>
      )}
      <KanjiModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        kanji={selectedKanji}
        favorited={selectedKanji?.favorited}
        onToggleFavorite={async () => {
          if (!selectedKanji) return;
          try {
            const res = await axios.patch(
              `https://kanjai-backend.onrender.com/kanji/${selectedKanji.character}/mylist`
            );
            const updated = res.data;

            setSelectedKanji((prev) => ({
              ...prev,
              favorited: updated.favorited,
            }));

            const refreshed = await axios.get(
              "https://kanjai-backend.onrender.com/mylist"
            );
            setMyList(refreshed.data);
          } catch (error) {
            console.error("Error toggling favorite:", err);
          }
        }}
      />
    </div>
  );
}

export default MyList;
