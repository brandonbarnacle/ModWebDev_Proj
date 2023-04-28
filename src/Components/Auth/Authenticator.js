import React, { useState, useEffect } from "react";
import { checkUser, currUser } from "./AuthService";
import DisplaySelect from "./DisplaySelect";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm"
import VerifyForm from "./VerifyForm";
import '../../css/authenticator.css';
import '../../css/common.css';
//import loading from '../../Images/loading.gif';

const Authenticator = ({setCurrentUserReady, setGlobalUser}) => {

    // Variable to store the user data
    const [ currentUser, setCurrentUser ] = useState(null);

    // What the authenticator should display
    // 0 = login
    // 1 = register
    // 2 = verification
    // 3 = nothing (already logged in and verified)
    const [ displayType, setDisplayType ] = useState(null);

    const [ readyUp, setReadyUp ] = useState(false);
    const [ opponentReady, setOpponentReady ] = useState(false);

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

    useEffect(() => {
        console.log('Display Type is now globally set to: ' + displayType);
    }, [displayType]);

    useEffect(() => {
        if (currentUser)
        {
            console.log('Setting global user!');
            setGlobalUser(currentUser);
        }
    }, [currentUser, setGlobalUser]);

    useEffect(()=>{
        setCurrentUserReady(readyUp);
    }, [readyUp, setCurrentUserReady])

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
    // else if(displayType === 3)
    // {
    //     return(
    //         <div>
    //             <div class="authenticator-wrapper">
    //                 <div class="ready-form">
    //                     <img src={loading} height="30px" width="30px"/>
    //                     <h3>Waiting for Opponent...</h3>
    //                 </div>
    //                 <div class="screenblur"></div>
    //             </div>
    //         </div>
    //     )
    // }
    else if(readyUp/* && opponentReady*/)
    {
        console.log('Game time started');
    }
    else
    {
        return(
            <p>Error</p>
        )
    }
}

export default Authenticator;