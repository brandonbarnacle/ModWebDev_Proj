import { logoutUser, checkUser } from "./AuthService";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUser()) {
            alert("You are not logged in!");
            navigate(-1);
        }
        else
        {
            logoutUser();
            navigate('/');
        }
    }, [navigate]);
}

export default Logout;