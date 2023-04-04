import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { checkUser } from "../Components/Auth/AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate();

    // Give the user an option to go to log in screen if they are unauthorized to view resource
    const goBackHandler = () => {
        navigate('/auth/login');
    };

    useEffect(() => {
        // if the user is authorized...
        if (checkUser()) 
        {
            return <Component />;
        }
        // if the user is unauthorized...
        else
        {
            navigate("/auth/login");
        }
      }, []);

    // // if the user is authorized...
    // if (checkUser()) {
    //     return <Component />;
    // // if the user is unauthorized...
    // } else {
    //     // return (
    //     //     <div>
    //     //         <p>Unauthorized!</p> <button onClick={goBackHandler}>Log in.</button>
    //     //     </div>
    //     // );
    //     navigate('/auth/login');
    // }
};

export default ProtectedRoute;
