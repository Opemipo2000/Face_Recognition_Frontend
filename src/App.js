import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Record from "./pages/Record";
import Registration from "./pages/Registration";
import NoPage from "./pages/NoPage";
import styles from "./index.css"

export default function App() {
  return (
    <div className="bg-green-950 h-screen font-poppins overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />-
          <Route path="/register" element={<Registration />} />
          <Route path="/records" element={<Record />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
