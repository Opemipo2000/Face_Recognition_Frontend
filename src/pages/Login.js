import React from "react";

import Camera from "../components/Camera";

export default function Login() {
  return (
    <div className="mx-2 text-white pt-40 px-10">
      <h2 className="text-[60px] font-sans font-medium">Meeting Login Page</h2>
      <Camera />
    </div>
  );
  // There will be an if statement saying that if successful (identity given is the same as identity received), go to the success page.
}
