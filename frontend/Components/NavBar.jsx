import react from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Typewriter from "../Components/Typewriter";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";

function NavBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/question?q=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center px-12 py-6 justify-between">
      <div className="">
        <Link to="/">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            Kanj.AI<span className="w-7 h-7 rounded-full bg-red-500"></span>
          </h1>
        </Link>
      </div>
      <div className="relative w-full max-w-md">
        <input
          type="search"
          id="mySearch"
          name="q"
          placeholder="Ask a question you have about any kanji"
          value={query}
          className="bg-gray-100 h-10 w-full pr-16 pl-8 rounded-full font-[DM_Sans] font- focus:outline-none"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="font-[DM_Sans] font-medium absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Link to="/study" className="font-[DM_Sans] font-regular px-2">
          Study
        </Link>
        <Link to="/myList" className="font-[DM_Sans] font-regular px-6">
          My List
        </Link>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-full bg-black text-white px-4 py-1.5 font-[DM_Sans] font-regular">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}

export default NavBar;
