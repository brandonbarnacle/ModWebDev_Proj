import React from "react";
import PongParent from "../Pong/PongParent.js";

/* This module is a wrapper for whatever game is put in */
const Game = () => {
  return (
    <div>
      <PongParent />
    </div>
  );
};

export default Game;