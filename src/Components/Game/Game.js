import React, { useState, useEffect } from "react";
import Pong from "../Pong/Pong.js";
import { getMatchUp, findAvailableMatchUp, setUpSubscription, setPlayerOnePos, setPlayerTwoPos, setWinner, setActive } from "../../Common/Services/MatchUp.js";

/* This module is a wrapper for whatever game is put in */
const Game = ({currentUserReady, user}) => {

    const [ currentPlayerLoaded, setCurrentPlayerLoaded ] = useState(false);
    const [ otherPlayerLoaded, setOtherPlayerLoaded ] = useState(false);
    const [ readyToStart, setReadyToStart ] = useState(false);
    const [ matchUp, setMatchUp ] = useState(null);
    const [ isPlayerOne, setIsPlayerOne ] = useState(false);
    const [ subscription, setSubscription ] = useState(null);
    const [ yPlayerOne, setYPlayerOne ] = useState(0);
    const [ yPlayerTwo, setYPlayerTwo ] = useState(0);
    const [ isWinner, setIsWinner ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);

    useEffect(()=>{
        if(currentUserReady && user)
        {
            findAvailableMatchUp(user)
            .then((newMatchUp)=>{
                setMatchUp(newMatchUp);
                setCurrentPlayerLoaded(true);
                if (newMatchUp.attributes.playerOne.id === user.id)
                {
                    setIsPlayerOne(true);
                }
                else if (newMatchUp.attributes.playerTwo.id === user.id)
                {
                    setIsPlayerOne(false);
                }
            });
        }
    }, [user, currentUserReady]);

    useEffect(() => {
        if (currentPlayerLoaded && !otherPlayerLoaded)
        {
            console.log('Current player ready, waiting for other player.');
        }
        else if (currentPlayerLoaded && !otherPlayerLoaded)
        {
            console.log('Both players ready!');
        }
    }, [currentPlayerLoaded, otherPlayerLoaded]);

    useEffect(() => {
        if (matchUp)
        {
            let newSubscription = setUpSubscription(matchUp);
            setSubscription(newSubscription);
        }
    }, [matchUp]);

    useEffect(() => {
        if(subscription && isPlayerOne)
        {
            subscription.on('update', (object) => {
                var yPlayerOne = object.get('playerOnePos');
                setYPlayerOne(yPlayerOne);
            });
        }
        else if(subscription)
        {
            subscription.on('update', (object) => {
                var yPlayerTwo = object.get('playerTwoPos');
                setYPlayerTwo(yPlayerTwo);
            });
            subscription.on('update', (object) => {
                var playerTwo = object.get('playerTwo');
                if (playerTwo)
                {
                    setReadyToStart(true);
                }
            });
        }
    }, [subscription, isPlayerOne]);

    useEffect(()=>{
        if (matchUp)
        {
            setPlayerOnePos(matchUp, yPlayerOne);
        }
    }, [yPlayerOne, matchUp]);

    useEffect(()=>{
        if (matchUp)
        {
            setPlayerTwoPos(matchUp, yPlayerTwo);
        }
    }, [yPlayerTwo, matchUp]);

    useEffect(()=>{
        if (matchUp && isWinner)
        {
            setActive(matchUp, false);
            setWinner(matchUp, user);
        }
    }, [isWinner, matchUp, user]);

    return (
        <div>
            <canvas id="gl-canvas" width="1024" height="512"></canvas>
            <div>
                <h1 id="score"></h1>
            </div>
            <Pong 
                yPlayerOneArg={yPlayerOne}
                yPlayerTwoArg={yPlayerTwo}
                startGame={readyToStart}
                updateYPlayerOne={setYPlayerOne}
                updateYPlayerTwo={setYPlayerTwo}
                setIsWinner={setIsWinner}
                setGameOver={setGameOver}
                isPlayerOne={isPlayerOne}
            />
        </div>
    );
};

export default Game;