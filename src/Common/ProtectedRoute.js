import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Components/Auth/AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate();

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
};

export default ProtectedRoute;
