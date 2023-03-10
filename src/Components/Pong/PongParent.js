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
                        <PongChild game={game}/>
                    </div>
                    <h4>Past Scores for {game.attributes['game_title']} (Via a One-To-Many Relationship):</h4>
                </div>
            )}
            {/* Check that the score data has finished loading before displaying info */}
            {scores.length > 0 && (
                <ul>
                    {scores.map((score) => (
                    <div>
                        <span>
                            <li key={score.id}>{score.attributes['score']}</li>
                        </span>
                    </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PongParent;