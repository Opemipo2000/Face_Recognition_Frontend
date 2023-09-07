import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-columm">
      <div className="mx-2 text-white pt-40 px-10">
      <h2 className="text-[60px] font-poppins font-medium" >Make</h2>
      <h2 className="text-[60px] font-poppins font-medium" >attendance </h2>
      <h2 className="text-[60px] font-poppins font-medium" >work for you.</h2>

     
     <div className="mt-20 flex-row">
      <Link to="/register">
        <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">ENROLL DETAILS</button>
      </Link>
      <br />
      <Link to="/login">
        <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">JOIN VIDEO MEETING</button>
      </Link>
      <br />
      <Link to="/records">
        <button className="bg-green-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">ATTENDANCE RECORD</button>
      </Link>
      </div>
      </div>
      <div>Insert pic here</div>
    </div>
  );
}
