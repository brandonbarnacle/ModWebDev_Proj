import React, { useState, useEffect } from "react";
import MainList from "./MainList";
import Authenticator from "../Auth/Authenticator";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";

const MainModule = () => {

    const [ currentUserReady, setCurrentUserReady ] = useState(false);
    const [ currentUser, setCurrentUser ] = useState('');

    useEffect(()=>{
        if (currentUserReady)
        {
            console.log('The current user is ready!');
        }
        else
        {
            console.log('The current user is not ready!');
        }
    }, [currentUserReady])

    useEffect(()=>{
        console.log('The current user in Main is: ' + currentUser);
    },[currentUser]);

    return (
        <div>
        <Authenticator 
            setCurrentUserReady={setCurrentUserReady}
            setGlobalUser={setCurrentUser}
        />
        <Game 
            currentUserReady={currentUserReady}
            user={currentUser}
        />
        <Leaderboard />
        <MainList />
        </div>
    );
};

export default MainModule;
