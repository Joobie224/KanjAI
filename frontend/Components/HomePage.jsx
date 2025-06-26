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
import NavBar from "./NavBar";

function HomePage() {
  return (
    <>
      <Typewriter />
      <div className="flex justify-between py-12 px-12 mb-60">
        <h1 className="font-[DM_Sans] font-black text-6xl w-1/3">
          Your all-in-one AI powered <div className="text-red-500">kanji</div>{" "}
          study tool
        </h1>
        <div className="bg-white rounded-2xl shadow-md p-4 w-1/2 ">
          <div className="text-sm text-gray-500 mb-2">You:</div>
          <div className="bg-gray-100 rounded-lg p-3 mb-3">
            <p className="text-gray-800 font-medium">What does 火 mean?</p>
          </div>
          <div className="text-sm text-gray-500 mb-2">Kanj.AI:</div>
          <div className="bg-black text-white rounded-lg p-3">
            <p>
              It means <span className="font-semibold">"fire"</span>. The shape
              looks like flames rising from a small source.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-red-50 p-10">
        <div className="flex flex-col items-center font-[DM_Sans] text-black justify-center mb-20">
          <h1 className="font-black text-5xl mb-3">You'll love Kanj.AI</h1>
          <i className="font-light text-gray-500">
            Learning kanji doesn't have to be hard, make it even easier with
            AI-powered assistance
          </i>
        </div>
        <div className="flex justify-between gap-6 px-10 min-h-65">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md flex-1">
            <p>
              Create an account and then select the kanji set you want to study
              from <i>joyo</i> to all available kanji.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md flex-1">
            <p>
              Study the list of kanji utilizing GPT AI to create catchy and
              memorable mnemonics to help with memorization.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow-md flex-1">
            <p>
              Create your own custom set of kanji you are currently learning to
              smoothly pick back up from your last study session.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
