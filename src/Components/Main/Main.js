import React from "react";
import MainList from "./MainList";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const MainModule = () => {
  return (
    <div>
      This is the main module.
      <MainList />
    </div>
  );
};

export default MainModule;
