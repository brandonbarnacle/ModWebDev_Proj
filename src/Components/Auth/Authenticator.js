import React, { useState, useEffect } from "react";
import { checkUser, currUser } from "./AuthService";
import DisplaySelect from "./DisplaySelect";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"
import VerifyForm from "./VerifyForm";
import '../../css/authenticator.css';
import '../../css/common.css';
//import loading from '../../Images/loading.gif';

const Authenticator = ({setCurrentUserReady, setGlobalUser, reset}) => {

    // Variable to store the user data
    const [ currentUser, setCurrentUser ] = useState(null);

    // What the authenticator should display
    // 0 = login
    // 1 = register
    // 2 = verification
    // 3 = nothing (already logged in and verified)
    const [ displayType, setDisplayType ] = useState(0);

    const [ readyUp, setReadyUp ] = useState(false);

    // Check if the user is authenticated on page load
    useEffect(() => {
        if (checkUser()) {
            setCurrentUser(currUser);
            setDisplayType(2);
        }
        else
        {
            setDisplayType(0);
        }
    }, []);

    // On reset, set the display back to verify
    useEffect(() => {
        if (reset)
        {
            setReadyUp(false);
            setDisplayType(2);
        }
    }, [reset]);

    // Tell the parent component who the current user is
    useEffect(() => {
        if (currentUser)
        {
            setGlobalUser(currentUser);
        }
    }, [currentUser, setGlobalUser]);

    // Tell the parent component the user is ready to start
    useEffect(()=>{
        setCurrentUserReady(readyUp);
    }, [readyUp, setCurrentUserReady])

    // Login view
    if (displayType === 0)
    {
        return(
            <div>
                <div class="authenticator-wrapper">
                    <div class="authenticator">
                        <DisplaySelect
                            setDisplayType={setDisplayType}
                            displayType={displayType}
                        />
                        <LoginForm 
                            setDisplayType={setDisplayType}
                            setCurrentUser={setCurrentUser}
                        />
                    </div>
                </div>
                <div class="screenblur"></div>
            </div>
        )
    }
    // Register view
    else if(displayType === 1)
    {
        return(
            <div>
                <div class="authenticator-wrapper">
                    <div class="authenticator">
                        <DisplaySelect
                            setDisplayType={setDisplayType}
                            displayType={displayType}
                        />
                        <RegisterForm 
                            autoLogin={true}
                            setDisplayType={setDisplayType}
                            setCurrentUser={setCurrentUser}
                        />
                    </div>
                </div>
                <div class="screenblur"></div>
            </div>
        )
    }
    // Verify view
    else if(displayType === 2)
    {
        return(
            <div>
                <div class="authenticator-wrapper">
                    <div class="authenticator">
                        <VerifyForm
                            setDisplayType={setDisplayType}  
                            user={currentUser}
                            setReadyUp={setReadyUp} 
                        />
                    </div>
                    <div class="screenblur"></div>
                </div>
            </div>
        )
    }
    // Done
    else if(readyUp)
    {
        return(
            <div></div>
        );
    }
    // Error
    else
    {
        return(
            <p>Error</p>
        )
    }
}

export default Authenticator;