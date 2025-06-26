import { useState, useEffect } from "react";
import "./App.css";
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
import HomePage from "../Components/HomePage";
import NavBar from "../Components/NavBar";
import Study from "../Components/Study";
import KanjiCategory from "../Components/KanjiCategory";
import Layout from "../Components/Layout";
import AnswerPage from "../Components/AnswerPage";
import MyList from "../Components/MyList";
import Contact from "../Components/Contact";

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/study"
          element={
            <Layout>
              <SignedIn>
                <Study />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Layout>
          }
        />
        <Route
          path="/study/:category"
          element={
            <Layout>
              <SignedIn>
                <KanjiCategory />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Layout>
          }
        />
        <Route
          path="/mylist"
          element={
            <Layout>
              <SignedIn>
                <MyList />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </Layout>
          }
        />
        <Route
          path="/question"
          element={
            <Layout>
              <AnswerPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn routing="path" path="/signin" />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
