import React, { useEffect, useState } from 'react';
import { loginUser } from './AuthService';
import AuthForm from './AuthForm';

const LoginForm = ({setDisplayType, setCurrentUser}) => {

    // Variable to store current user data
    const [newUser, setNewUser] = useState({
        email: "",
        password: ""
    });

    // set to true when ready to submit
    const [submit, setSubmit] = useState(false);

    // set to true to show error message
    const [showErr, setShowErr] = useState(false);

    // useEffect that run when changes are made to the state variable flags
    useEffect(() => {
        if (newUser && submit) {
            loginUser(newUser)
            .then((userLoggedIn) => {
                if (userLoggedIn) {
                    console.log(`${userLoggedIn.get("firstName")}, you successfully logged in!`);
                    //setAuthenticated(true);
                    setDisplayType(2);
                    setCurrentUser(userLoggedIn);
                }
                else
                {
                    setShowErr(true);
                }
                setSubmit(false);
            })
            .catch(()=>{
                setShowErr(true);
            });
      }
    }, [newUser, submit, setDisplayType, setCurrentUser]);
  
    // Show errors
    useEffect(()=>{
        if(showErr)
        {
            console.log('An error ocurred!');
        }
    },[showErr]);

    const onChangeHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        const { name, value: newValue } = e.target;
        console.log(newValue);
    
        setNewUser({
            ...newUser,
            [name]: newValue
        });
    };

    // notify the system to try the current credentials to log in
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSubmit(true);
    };

    return(
        <AuthForm
            user={newUser}
            isLogin={true}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
        />
    )
}

export default LoginForm;