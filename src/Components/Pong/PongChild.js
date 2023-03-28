import React from "react";
import initShaders from "../../Common/WebGL/Common/initShaders";
import WebGLUtils from "../../Common/WebGL/Common/webgl-util";
import { vec2, vec3, flatten } from "../../Common/WebGL/Common/MV";
import vert from "../../Common/WebGL/Shaders/Pong/pong.vert";
import frag from "../../Common/WebGL/Shaders/Pong/pong.frag";


const PongChild = ({game}) => {

    console.log(vert);

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
