import React from "react";
import MainModule from "./Main/Main.js";
import About from "./About/About.js";
import Footer from "./Footer/Footer.js";
import PongParent from "./Pong/PongParent.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Footer />
      <Routes>
        <Route path="/" element={<MainModule />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/pong" element={<PongParent />}></Route>
      </Routes>
    </Router>
  );
}
