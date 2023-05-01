import React from "react";
import MainModule from "./Main/Main.js";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainModule />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </Router>
  );
}
