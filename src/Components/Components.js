import React from "react";
import MainModule from "./Main/Main.js";
import About from "./About/About.js";
import Footer from "./Footer/Footer.js";
import PongParent from "./Pong/PongParent.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthLogin from "./Auth/AuthLogin";
import AuthRegister from "./Auth/AuthRegister";

export default function Components() {
  return (
    <Router>
      <Footer />
      <Routes>
        <Route path="/" element={<MainModule />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/pong" element={<PongParent />}></Route>
        <Route path="/auth/login" element={<AuthLogin />}></Route>
        <Route path="/auth/register" element={<AuthRegister />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Router>
  );
}
