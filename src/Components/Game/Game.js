import React, { useState, useEffect } from "react";
import PongParent from "../Pong/PongParent.js";
import { getMatchUp, findAvailableMatchUp } from "../../Common/Services/MatchUp.js";

/* This module is a wrapper for whatever game is put in */
const Game = ({currentUserReady, user}) => {

    const [ currentPlayerLoaded, setCurrentPlayerLoaded ] = useState(false);
    const [ otherPlayerLoaded, setOtherPlayerLoaded ] = useState(false);
    const [ matchUp, setMatchUp ] = useState(null);

    useEffect(()=>{
        if(currentUserReady && user)
        {
            console.log('Calling findAvailableMatchup()!');
            findAvailableMatchUp(user)
            .then((newMatchUp)=>{
                setMatchUp(newMatchUp);
            });
        }
    },[user, currentUserReady]);

    // async function setUpLiveQuery(){
    //     client = new Parse.LiveQueryClient({
    //         applicationId: '2FgDITUa7Ud9aTfc2n9m3mKUNMMXp9juemjAp0Cq',
    //         serverURL: 'wss://feature6.b4a.io', 
    //         javascriptKey: 'OEZ1ViibPs3KVyj6TtqbDw7CvYfwF1Bjkiw3aAU9'
    //     });
    //     client.open();

    //     // set up query for the match
    //     matchQuery = new Parse.Query('MatchUp');
    //     matchQuery.equalTo('objectId', 'pS9b4vI0XQ');
    //     // set up subscription for updates
    //     subscription = client.subscribe(matchQuery);

    //     // find if player one or two
    //     var currentUser = Parse.User.current();
    //     theGame = await matchQuery.first();

    //     if (currentUser.getUsername() === theGame.get('playerOne')['id']){
    //         playerOne = 0;
    //     }
    //     else {
    //         playerOne = 1;
    //     }

    //     // set up subscriptions
    //     if (playerOne === 1) {
    //         subscription.on('update', (object) => {
    //             var temp = object.get('playerOnePos');
    //             yPlayerOne = temp;
    //     });
    //     }
    //     else if (playerOne === 0) {
    //         subscription.on('update', (object) => {
    //             var temp = object.get('playerTwoPos');
    //             yPlayerTwo = temp;
    //         });
    //     }
    // }

    return (
        <div>
        <PongParent />
        </div>
    );
};

export default Game;