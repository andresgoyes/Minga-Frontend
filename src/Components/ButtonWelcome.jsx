import React from "react";
import { Link } from "react-router-dom";

export default function ButtonWelcome({ name }) {
  return (
    <div className="flex justify-center">
      <Link
        to="/mangas"
        className="bg-gradient-to-r from-[#4338CA] to-[#5E52F3] text-[#FFFFFF] flex justify-center items-center gap-2.5 px-[55px] py-5 text-center text-xl font-medium leading-[95.187%] rounded-md w-60">
        {name}
      </Link>
    </div>
  );
}