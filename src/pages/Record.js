import React from "react";

export default function Record() {
  return (
    <div className="h-screen bg-green-950 flex flex-columm">
      <div className="mx-2 text-white pt-40 px-10">
      <h1 className="pb-10 font-medium text-green-400">Let us help you.</h1>
      <h2 className="font-normal text-[16px] text-green-500">Enter your details for a detailed view of your </h2>
      <h2 className="font-normal text-[16px] text-green-500">attendance history.</h2>

<div className="flex-row my-20 ml-[100pt]">
  <div className="flex-row my-5" >
  <input className="bg-green-950 py-3 text-[30px] font-mono " placeholder="ENTER NAME"></input>
  </div>
     <div>
     <input className="bg-green-950 py-3 text-[30px] font-mono" placeholder="ENTER EMAIL"></input>
     </div>
     
</div>

<button className="bg-lime-400 px-20 py-3 rounded-[25px] font-bold text-[18px] text-black w-[100%] my-2">CHECK ATTENDANCE</button>

</div>
<div>insert pic here</div>
    </div>
  );
}
