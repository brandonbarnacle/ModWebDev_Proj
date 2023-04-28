import React from "react";
import { logoutUser } from "./AuthService";
import '../../css/verify-form.css';

const VerifyForm = ({setDisplayType, user, setReadyUp}) => {
    
    const switchHandler = () => {
        logoutUser()
        .then(()=>{
            setDisplayType(0);
        });
    }

    const readyHandler = () => {
        setDisplayType(3);
        setReadyUp(true);
    }

    if(user)
    {
        return(
            <div class="verify-form">
                <h2>Welcome!</h2>
                <h3>Would you like to continue as <b>{user.attributes.username}</b>?</h3>
                <div class="verify-form-buttons-wrapper">
                    <button type="button" onClick={readyHandler}>Yes</button>
                    <button type="button" onClick={switchHandler}>Switch User</button>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <p>Error</p>
        )
    }
}

export default VerifyForm;