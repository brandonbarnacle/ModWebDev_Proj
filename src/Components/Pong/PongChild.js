import React from "react";

const PongChild = ({game}) => {

    // This is where the WebGL logic will go to animate the game.

    return (
        <div>
            <h3>
                This is the child component for {game.attributes['game_title']}!
            </h3>
            <p>
                This child component will contain the logic to control the game.
            </p>
        </div>
    );

};

export default PongChild;
