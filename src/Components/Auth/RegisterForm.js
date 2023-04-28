import React, { useState, useEffect } from "react";
import { createUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";

const RegisterForm = ({autoLogin, setDisplayType, setCurrentUser}) => {

    // Variable to store new user
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // set to true when ready to submit
    const [submit, setSubmit] = useState(false);

    // useEffect that run when changes are made to the state variable flags
    useEffect(() => {
        if (newUser && submit) {
        createUser(newUser)
        .then((userCreated) => {
            if (userCreated) {
                console.log(`${userCreated.get("firstName")}, you successfully registered!`);
                if(autoLogin)
                {
                    loginUser(newUser)
                    .then((userLoggedIn) => {
                        if (userLoggedIn) {
                            console.log(`${userLoggedIn.get("firstName")}, you successfully logged in!`);
                            //setAuthenticated(true);
                            setDisplayType(2);
                            setCurrentUser(userLoggedIn);
                        }
                        setSubmit(false);
                    })
                }
                else
                {
                    setDisplayType(0);
                }
            }
            setSubmit(false);
        });
        }
    }, [newUser, submit, setDisplayType, autoLogin, setCurrentUser]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;

    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setSubmit(true);
  };

  return (
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
  );
}

export default RegisterForm;