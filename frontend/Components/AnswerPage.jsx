import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function AnswerPage() {
  const queryParam = useQuery().get("q");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (queryParam) {
      axios
        .post("http://localhost:3000/api/ask", { question: queryParam })
        .then((res) => setAnswer(res.data.answer))
        .catch(() => setAnswer("Sorry, something went wrong :("))
        .finally(() => setLoading(false));
    }
  }, [queryParam]);

  return (
    <div className="min-h-screen flex flex-col p-12 bg-white">
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-4 font-[DM_Sans] font-black">
          You asked:
        </h1>
        <p className="text-xl font-[DM_Sans] italic mb-6">{queryParam}</p>

        <h2 className="text-xl font-semibold font-[DM_Sans] font-black">
          Answer:
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="mt-4 text-lg bg-gray-100 p-4 rounded font-[DM_Sans]">
            {answer}
          </p>
        )}
      </div>
    </div>
  );
}

export default AnswerPage;
