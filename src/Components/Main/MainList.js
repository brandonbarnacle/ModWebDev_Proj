import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Common/Services/LearnService";
import MainForm from "./MainForm";

/* STATEFUL PARENT COMPONENT */
const MainList = () => {
  // Variables in the state to hold data
  const [users, setUsers] = useState([]);

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return <MainForm users={users} />;
};

export default MainList;
