import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Contact() {
  return (
    <>
      <h1 className="flex justify-center text-6xl font-[DM_Sans] font-black h-50 bg-gray-100 items-center">
        Contact
      </h1>
      <p className="py-6 px-4 font-[DM_Sans] font-regular pb-84 text-2xl">
        Please direct all inquiries or concerns to hyungjunlee224@gmail.com
      </p>
    </>
  );
}

export default Contact;
