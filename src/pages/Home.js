import React from "react";
import { Link } from "react-router-dom";
import students2 from "../images/students2.png";

export default function Home() {
  return (
    <div className="flex flex-columm justify-between">
      <div className="mx-2 text-white px-20  pt-40">
        <h2 className="text-[60px] font-poppins font-semibold">Make</h2>
        <h2 className="text-[60px] font-poppins font-semibold">attendance </h2>
        <h2 className="text-[60px] font-poppins font-semibold">
          work for you.
        </h2>

        <div className="mt-20 flex-row">
          <Link to="/register">
            <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">
              ENROLL DETAILS
            </button>
          </Link>
          <br />
          <Link to="/login">
            <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">
              JOIN VIDEO MEETING
            </button>
          </Link>
          <br />
          <Link to="/records">
            <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">
              ATTENDANCE RECORD
            </button>
          </Link>
        </div>
      </div>
      <img className="w-[52%] h-screen" src={students2} />
    </div>
  );
}
