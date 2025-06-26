import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="bg-gray-100 text-center py-8">
        <h2 className="text-xl font-bold mb-2 text-gray-700">Kanj.AI</h2>
        <p className="text-sm text-gray-500 mb-4">
          AI-assisted kanji mastery made simple.
        </p>

        <div className="flex justify-center gap-6 mb-2 text-sm text-gray-600">
          <Link to="/contact" className="hover:text-black">
            Contact
          </Link>
          <a
            href="https://github.com/yourrepo"
            className="hover:text-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className="text-xs text-gray-400 flex justify-center">
          © 2025 Kanj.AI · <p className="hover:underline">Privacy Policy</p> ·{" "}
          <p className="hover:underline">Terms</p> ·{" "}
          <span>Powered by GPT-4, OpenAI</span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
