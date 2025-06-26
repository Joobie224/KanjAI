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
  SignIn,
} from "@clerk/clerk-react";
import NavBar from "./NavBar";

function Study() {
  return (
    <>
      <h1 className="flex justify-center text-6xl font-[DM_Sans] font-black h-50 bg-gray-100 items-center">
        Study Kanji by Category
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-15 list-inside text-xl mx-auto w-fit gap-x-100 py-10 font-[DM_Sans] font-light text-gray-800 underline">
        <li>
          <Link to="/study/joyo">Jōyō</Link>
        </li>
        <li>
          <Link to="/study/jinmeiyo">Jinmeiyō</Link>
        </li>
        <li>
          <Link to="/study/kyoiku">Kyōiku</Link>
        </li>
        <li>
          <Link to="/study/grade-1">Kyōiku (grade 1)</Link>
        </li>
        <li>
          <Link to="/study/grade-2">Kyōiku (grade 2)</Link>
        </li>
        <li>
          <Link to="/study/grade-3">Kyōiku (grade 3)</Link>
        </li>
        <li>
          <Link to="/study/grade-4">Kyōiku (grade 4)</Link>
        </li>
        <li>
          <Link to="/study/grade-5">Kyōiku (grade 5)</Link>
        </li>
        <li>
          <Link to="/study/grade-6">Kyōiku (grade 6)</Link>
        </li>
        <li>
          <Link to="/study/jlpt-5">JLPT 5</Link>
        </li>
        <li>
          <Link to="/study/jlpt-4">JLPT 4</Link>
        </li>
        <li>
          <Link to="/study/jlpt-3">JLPT 3</Link>
        </li>
        <li>
          <Link to="/study/jlpt-2">JLPT 2</Link>
        </li>
        <li>
          <Link to="/study/jlpt-1">JLPT 1</Link>
        </li>
        <li>
          <Link to="/study/all">All Kanji</Link>
        </li>
      </ul>
    </>
  );
}

export default Study;
