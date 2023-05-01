import React, { useState, useEffect } from "react";
import Authenticator from "../Auth/Authenticator";
import Game from "../Game/Game";
import Leaderboard from "../Leaderboard/Leaderboard";
import '../../css/main.css';

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
            <div class="game-container">
                <Game 
                    currentUserReady={currentUserReady}
                    user={currentUser}
                />
                <Leaderboard />
            </div>
        </div>
    );
};

export default MainModule;
