import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../Components/Auth/AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const navigate = useNavigate();

    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // if the user is authorized...
        if (checkUser()) 
        {
            setFlag(true);
        }
        // if the user is unauthorized...
        else
        {
            alert("You need to log in first to play!");
            navigate("/auth/login");
        }
      }, []);

      if(setFlag){
        return <Component />;
      }
      else
      {
        return (
            <h1>Unauthorized!</h1>
        )
      }
};

export default ProtectedRoute;
