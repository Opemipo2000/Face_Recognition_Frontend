import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2>Make attendance work for you.</h2>
      <Link to="/register">
        <button>ENROLL DETAILS</button>
      </Link>
      <br />
      <Link to="/login">
        <button>JOIN VIDEO MEETING</button>
      </Link>
      <br />
      <Link to="/records">
        <button>ATTENDANCE RECORD</button>
      </Link>
    </div>
  );
}
