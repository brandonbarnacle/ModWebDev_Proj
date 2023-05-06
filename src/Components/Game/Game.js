import React, { useState, useEffect, useRef } from "react";
import Pong from "../Pong/Pong.js";
import { testSub, findAvailableMatchUp, setPlayerOnePos, setPlayerTwoPos, setWinner, setActive, setBallX, setBallY, setPlayerOneScore, setPlayerTwoScore, setVelX, setVelY } from "../../Common/Services/MatchUp.js";
import '../../css/game.css';

/* This module is a wrapper for whatever game is put in */
const Game = ({currentUserReady, user}) => {

    const [ matchUp, setMatchUp ] = useState(null);
    const [ isPlayerOne, setIsPlayerOne ] = useState(false);
    const [ yPlayerOne, setYPlayerOne ] = useState(0);
    const [ yPlayerTwo, setYPlayerTwo ] = useState(0);
    const [ isWinner, setIsWinner ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false);
    const [ velXState, setVelXState ] = useState(0.02);
    const [ velYState, setVelYState ] = useState(0);
    const [ ballXState, setBallXState ] = useState(0);
    const [ ballYState, setBallYState ] = useState(0);
    const [ playerOneScoreState, setPlayerOneScoreState ] = useState(0);
    const [ playerTwoScoreState, setPlayerTwoScoreState ] = useState(0);

    const doUpdate = useRef(true);
    const lastUpdate = useRef(0);
    const time = useRef();

    const timeInterval = 100;

    const startTheGame = useRef(false);

    // Set up ticks to slow down server calls
    useEffect(() => {
        const interval = setInterval(() => {
            time.current = new Date().getTime();
            if (time.current > lastUpdate.current + timeInterval)
            {
                doUpdate.current = true;
                lastUpdate.current = time.current;
                // console.log('Time to update!');
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Check if game is over
    useEffect(()=>{
        if(gameOver)
        {
            console.log('Game Over!');
        }
    },[gameOver]);

    // Read values from database
    useEffect(() => {
        if(matchUp){
            var testsub = testSub(matchUp);
            testsub.on('update', (object) => {
                if (doUpdate.current)
                {
                    doUpdate.current = false;
                    console.log("updating!");
                    var yPlayerOneArg = object.get('playerOnePos');
                    setYPlayerOne(yPlayerOneArg);

                    console.log('yPlayerOne: ', yPlayerOne);

                    var yPlayerTwoArg = object.get('playerTwoPos');
                    setYPlayerTwo(yPlayerTwoArg);

                    console.log('yPlayerTwo: ', yPlayerTwo);

                    var playerTwo = object.get('playerTwo');
                    if (playerTwo)
                    {
                        startTheGame.current = true;
                    }

                    var velX = object.get('velX');
                    setVelXState(velX);

                    console.log('velX: ', velX);

                    var velY = object.get('velY');
                    setVelYState(velY);

                    console.log('velY: ', velY);

                    var ballX = object.get('ballX');
                    setBallXState(ballX);

                    console.log('ballX: ', ballX);

                    var ballY = object.get('ballY');
                    setBallYState(ballY);

                    console.log('ballY: ', ballY);

                    var playerOneScore = object.get('playerOneScore');
                    setPlayerOneScoreState(playerOneScore);

                    console.log('playerOneScore: ', playerOneScore);

                    var playerTwoScore = object.get('playerTwoScore');
                    setPlayerTwoScoreState(playerTwoScore);

                    console.log('playerTwoScore: ', playerTwoScore);
                }

              });
            console.log("the id: ", matchUp.id);
        }
    }, [matchUp, yPlayerOne, yPlayerTwo]);
    
    // Game matching logic
    useEffect(()=>{
        if(currentUserReady && user)
        {
            findAvailableMatchUp(user)
            .then((newMatchUp)=>{
                setMatchUp(newMatchUp);
                if (newMatchUp.attributes.playerOne.id === user.id)
                {
                    setIsPlayerOne(true);
                }
                else if (newMatchUp.attributes.playerTwo.id === user.id)
                {
                    setIsPlayerOne(false);
                    startTheGame.current = true;
                }
            });
        }
    }, [user, currentUserReady]);

    //  Game is over, update database

    useEffect(()=>{
        if (matchUp && gameOver)
        {
            setActive(matchUp, false);
            setWinner(matchUp, isWinner);
        }
    }, [isWinner, matchUp, gameOver]);

    return (
        <div class="game">
            <canvas id="gl-canvas" width="1024" height="512"></canvas>
            <div class="scorebar">
                <h1 id="score">Loading...</h1>
            </div>
            <Pong 
                yPlayerOneArg={yPlayerOne}
                yPlayerTwoArg={yPlayerTwo}
                startGame={startTheGame}
                updateYPlayerOne={(newPlayerOnePos) => setPlayerOnePos(matchUp, newPlayerOnePos)}
                updateYPlayerTwo={(newPlayerTwoPos) => setPlayerTwoPos(matchUp, newPlayerTwoPos)}
                setIsWinner={setIsWinner}
                setGameOver={setGameOver}
                isPlayerOne={isPlayerOne}
                velX={velXState}
                velY={velYState}
                ballX={ballXState}
                ballY={ballYState}
                playerOneScoreArg={playerOneScoreState}
                playerTwoScoreArg={playerTwoScoreState}
                setPlayerTwoScore={(newPlayerOneScore) => setPlayerOneScore(matchUp, newPlayerOneScore)}
                setPlayerOneScore={(newPlayerTwoScore) => setPlayerTwoScore(matchUp, newPlayerTwoScore)}
                setBallX={(newBallX) => setBallX(matchUp, newBallX)}
                setBallY={(newBallY) => setBallY(matchUp, newBallY)}
                setVelX={(newVelX) => setVelX(matchUp, newVelX)}
                setVelY={(newVelY) => setVelY(matchUp, newVelY)}
                tick={false}
            />
        </div>
    );
};

export default Game;