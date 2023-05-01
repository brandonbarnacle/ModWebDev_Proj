import React, { useState, useEffect } from "react";
import Authenticator from "../Auth/Authenticator";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";

const MainModule = () => {

    const [ currentUserReady, setCurrentUserReady ] = useState(false);
    const [ currentUser, setCurrentUser ] = useState('');
    const [ reset, setReset ] = useState(false);

    useEffect(() => {
        if(reset)
        {
            setCurrentUserReady(false);
            setCurrentUser(null);
            setReset(false);
        }
    }, [reset]);

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
        </div>
    );
};

export default MainModule;
