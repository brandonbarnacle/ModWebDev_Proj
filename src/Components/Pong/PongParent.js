import React, { useEffect, useState } from "react";
import { getGameById } from "../../Common/Services/Game.js";
import { getScoresByGame } from "../../Common/Services/Score.js";
import PongChild from "./PongChild.js";

const PongParent = () => {

    // Variables in the state to hold data
    const [game, setGame] = useState([]);
    const [scores, setScores] = useState([]);

    // Grab game data
    useEffect(() => {
        getGameById('EBBOlr3RPM').then((game) => {
        console.log(game);
        setGame(game);
        });
    }, []);

    // Grab scores data
    useEffect(() => {
        getScoresByGame('EBBOlr3RPM').then((scores) => {
            console.log(scores);
            setScores(scores);
        });
    }, []);

    return (
        <div>
            {/* Check that the game data has finished loading before displaying info and sending to child */}
            {game.attributes && (
                <div>
                    {console.log(game)}
                    <h2>
                        This is placehold page for {game.attributes['game_title']}!
                    </h2>
                    <div>
                        <canvas id="gl-canvas" width="512" height="512"></canvas>
                        <div>
                            <button id="speed-up">Ball Speed +</button>
                            <button id="slow-down">Ball Speed -</button>
                            <button id="paddle-left">Paddle Left</button>
                            <button id="paddle-right">Paddle Right</button>
                            <h2>
                                Bounces:
                                <p id="num-bounces" style={{display:'inline'}}></p>
                            </h2>
                        </div>
                        <PongChild game={game}/>
                    </div>
                    <h4>Past Scores for {game.attributes['game_title']} (Via a One-To-Many Relationship):</h4>
                </div>
            )}
            {/* Check that the score data has finished loading before displaying info */}
            {scores.length > 0 && (
                <ul>
                    {scores.map((score) => (
                        <li key={score.id}>{score.attributes['score']}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PongParent;