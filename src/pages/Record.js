import React from "react";
import { Link } from "react-router-dom";
import students1 from "../images/students1.PNG";

export default function Record() {
  return (
    <div className="flex flex-columm font-poppins justify-between h-screen overflow-y-auto">
      <div className="mx-2 text-white pt-40 px-20">
        <h1 className=" font-poppins pb-10 font-semibold text-green-400">
          Let us help you.
        </h1>
        <h2 className="font-normal text-[16px] text-green-500">
          Enter your details for a detailed view of your{" "}
        </h2>
        <h2 className="font-normal text-[16px] text-green-500">
          attendance history.
        </h2>

        <div className="flex-row my-20 ml-[10pt]">
          <div className="flex-row my-5 border">
            <input
              className="bg-green-950 py-3 text-[30px] font-mono"
              placeholder="ENTER FIRSTNAME"
            ></input>
          </div>
          <div className="flex-row my-5 border">
            <input
              className="bg-green-950 py-3 text-[30px] font-mono "
              placeholder="ENTER LASTNAME"
            ></input>
          </div>
          <div className="flex-row my-5 border">
            <input
              className="bg-green-950 py-3 text-[30px] font-mono "
              placeholder="ENTER EMAIL"
            ></input>
          </div>
        </div>
        <Link to="/history">
          <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">
            CHECK ATTENDANCE
          </button>
        </Link>
      </div>
      <img src={students1} className="absolute w-100px right-0 h-screen" />
    </div>
  );
}
