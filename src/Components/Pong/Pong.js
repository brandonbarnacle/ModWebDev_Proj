import initShaders from "../../Common/WebGL/Common/initShaders";
import setupWebGL from "../../Common/WebGL/Common/webgl-util";
import { vec2, vec4, flatten, perspective } from "../../Common/WebGL/Common/MV";
import vert from "../../Common/WebGL/Shaders/Pong/pong-vert.js";
import frag from "../../Common/WebGL/Shaders/Pong/pong-frag.js";
import React, { useEffect, useRef } from 'react';

const Pong = ({yPlayerOneArg, yPlayerTwoArg, startGame, updateYPlayerOne, updateYPlayerTwo, setIsWinner, setGameOver, isPlayerOne, velX, velY, ballX, ballY, playerOneScoreArg, playerTwoScoreArg, setPlayerTwoScore, setPlayerOneScore, setBallX, setBallY, setVelX, setVelY, tick}) => {
    // Variables for WedGL script
    var gl;
    var vertices = [];
    var u_ColorLoc;
    var u_vCenterLoc;
    var xPlayerOne, yPlayerOne;
    var xPlayerTwo, yPlayerTwo;
    var playerOneScore, playerTwoScore;
    var u_projMatrixLoc;
    var extentBall = 0.1;
    var paddleMove = 0.1; 
    var playerOne;

    var gameOn;

    const newBallX = useRef(0);
    const newBallY = useRef(0);
    const newVelX = useRef(0.1);
    const newVelY = useRef(0);

    const doUpdate = useRef(true);
    const lastUpdate = useRef(0);
    const time = useRef();

    const timeInterval = 100;

    useEffect(() => {
        const interval = setInterval(() => {
            time.current = new Date().getTime();
            if (time.current > lastUpdate.current + timeInterval)
            {
                doUpdate.current = true;
                lastUpdate.current = time.current;
                console.log('Time to update the ball!');
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);
    
    // create WebGL context which is a JavaScript object that contains all the WebGL
    // functions and parameters
    // "gl-canvas" is the id of the canvas specified in the HTML file
    var canvas = document.getElementById("gl-canvas");
    gl = setupWebGL(canvas);
    if (!gl) {return (<h1>WebGL Loading...</h1>)}
    else { setup(); }  

    // check if player one
    if (isPlayerOne) {
        playerOne = 0;
    }
    else {
        playerOne = 1;
    }
 
    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.8, 0.8, 0.8, 1.0);

    // Load Shader and initialize attribute buffers
    var program = initShaders(gl, vert, frag);
    gl.useProgram(program);

    // Load data into GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    //position
    var a_vPositionLoc = gl.getAttribLocation(program, "a_vPosition");
    gl.vertexAttribPointer(a_vPositionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_vPositionLoc);
    // color
    u_ColorLoc = gl.getUniformLocation(program, "u_Color");
    // center
    u_vCenterLoc = gl.getUniformLocation( program, "u_vCenter" );

    // set up projection matrix
    u_projMatrixLoc = gl.getUniformLocation( program, "u_projMatrix" );
    var projMatrix = perspective(53, 2.0, 2.0, 2.1);
    gl.uniformMatrix4fv(u_projMatrixLoc, false, flatten(projMatrix) );

    // set up controls
    document.onkeydown = checkKey;

    render();

    function setup() {
        // set up score
        playerOneScore = playerOneScoreArg;
        playerTwoScore = playerTwoScoreArg;
        document.getElementById("score").innerHTML = "Player One: " + playerOneScore + " | Player Two: " + playerTwoScore;

        // get center of ball, set up radius
        var p = vec2(0.0);
        vertices.push(p);
        var radius = 0.1;

        // set initial ball velocity, random side start
        newVelY.current = newVelY.current;
        newVelX.current = newVelX.current; 

        // set up rest of ball points
        var increment = Math.PI/36;
        for (var theta=0.0; theta < Math.PI*2-increment; theta+=increment) {
            if (theta===0.0) {
                vertices.push(vec2(Math.cos(theta)*radius, Math.sin(theta)*radius));
            }
            vertices.push(vec2(Math.cos(theta+increment)*radius, Math.sin(theta+increment)*radius));
        }
 
        // set up the player one paddle
        vertices.push(vec2(0.0,-0.4));
        vertices.push(vec2(0.0,0.4));
        vertices.push(vec2(0.1,0.4));
        vertices.push(vec2(0.1,-0.4));

        // set up player one center
        xPlayerOne = -2.0;
        yPlayerOne = yPlayerOneArg;

        // set up the player one paddle
        vertices.push(vec2(0.0,-0.4));
        vertices.push(vec2(0.0,0.4));
        vertices.push(vec2(-0.1,0.4));
        vertices.push(vec2(-0.1,-0.4));

        // set up player one center
        xPlayerTwo = 2.0;
        yPlayerTwo = yPlayerTwoArg;
    }

    function render() {
        // set game to start
        if (startGame.current){
            gameOn = true;
        }
        else {
            gameOn = false;
        } 
        
        console.log("start the game: ", startGame);

        // clear buffer
        gl.clear(gl.COLOR_BUFFER_BIT);

        // draw sphere
        gl.uniform4fv(u_ColorLoc, vec4(0.4, 0.4, 1.0, 1.0));
        gl.uniform2fv (u_vCenterLoc, vec2(newBallX.current, newBallY.current));
        // the first 74 points are the ball
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 74 );  

        // draw player one paddle
        gl.uniform4fv(u_ColorLoc, vec4(1.0, 0.4, 0.4, 1.0));
        gl.uniform2fv (u_vCenterLoc, vec2(xPlayerOne, yPlayerOne));
        // the next 4 points are player one
        gl.drawArrays( gl.TRIANGLE_FAN, 74, 4 ); 

        // draw player two paddle
        gl.uniform4fv(u_ColorLoc, vec4(1.0, 0.4, 0.4, 1.0));
        gl.uniform2fv (u_vCenterLoc, vec2(xPlayerTwo, yPlayerTwo));
        // the next 4 points are player one
        gl.drawArrays( gl.TRIANGLE_FAN, 78, 4 );

        if(gameOn && doUpdate.current){
            animate();
            doUpdate.current = false;
        } 

        window.requestAnimFrame(render);
    }

    function animate() {
        // update all from data base;
        yPlayerOne = yPlayerOneArg;
        yPlayerTwo = yPlayerTwoArg;
        playerOneScore = playerOneScoreArg;
        playerTwoScore = playerTwoScoreArg;
        document.getElementById("score").innerHTML = "Player One: " + playerOneScore + " | Player Two: " + playerTwoScore;

            // increment xCenter and yCenter
            newBallX.current = newBallX.current + newVelX.current;
            newBallY.current = newBallY.current + newVelY.current;

            // check if hit player one paddle
            if (newBallX.current-extentBall <= xPlayerOne+0.1){
                if(newBallY.current-extentBall/2 <= yPlayerOne+0.4 && newBallY.current-extentBall/2 >= yPlayerOne-0.4){
                    // reverse x velocity
                    newBallX.current = -1.9 + extentBall;
                    newVelX.current = -newVelX.current;
                    // calculate y angle velocity
                    calcYVelocity(yPlayerOne);
                }
                else if(newBallY.current+extentBall/2 <= yPlayerOne+0.4 && newBallY.current+extentBall/2 >= yPlayerOne-0.4){
                    newBallX.current = -1.9 + extentBall;
                    newVelX.current = -newVelX.current;
                    // calculate y angle velocity
                    calcYVelocity(yPlayerOne);
                }
            }

            // check if hit player two padde
            else if (newBallX.current+extentBall >= xPlayerTwo-0.1){
                if(newBallY.current-extentBall/2 <= yPlayerTwo+0.4 && newBallY.current-extentBall/2 >= yPlayerTwo-0.4) {
                    newBallX.current = 1.9 - extentBall;
                    newVelX.current = -newVelX.current;
                    // calculate y angle velocity
                    calcYVelocity(yPlayerTwo);
                }
                else if(newBallY.current+extentBall/2 <= yPlayerTwo+0.4 && newBallY.current+extentBall/2 >= yPlayerTwo-0.4) {
                    newBallX.current = 1.9 - extentBall;
                    newVelX.current = -newVelX.current;
                    // calculate y angle velocity
                    calcYVelocity(yPlayerTwo);
                }
            }

            // check if hit top or bottom
            if(newBallY.current+extentBall >= 1.0) {
                newBallY.current = 1.0 - extentBall;
                newVelY.current = -newVelY.current;
            }
            if(newBallY.current-extentBall <= -1.0){
                newBallY.current = -1.0 + extentBall;
                newVelY.current = -newVelY.current;
            }

            // check if score
            if(newBallX.current+extentBall >= 2.0) {
                newVelY.current = 0.0;
                newVelX.current = 0.1;
                setPlayerOneScore(playerOneScore + 1);
                gameOn = false;
                resetGame();

            } 
            if(newBallX.current-extentBall <= -2.0) {
                newVelY.current = 0.0;
                newVelX.current = -0.1;
                setPlayerTwoScore(playerTwoScore + 1);
                gameOn = false;
                resetGame();

            }

            // check if game won
            if(playerOneScore >= 3) {
                gameOn = false;
                if(playerOne === 0){
                    setIsWinner(true);
                }
                setGameOver(true);
            }
            if (playerTwoScore >= 3){
                gameOn = false;
                if(playerOne === 1){
                    setIsWinner(true);
                }
                setGameOver(true);
            }
    }
  
    function checkKey(e){
        // set vars
        var tempOne = yPlayerOne;
        var tempTwo = yPlayerTwo;

        // setting up the event
        e = e || window.event;

        if(gameOn){
            // checking if up arrow
            if (e.keyCode === 38) {
                if (isPlayerOne){
                    tempOne += paddleMove;
                    if (tempOne+0.4 >= 1.0){
                        tempOne = 0.6;
                    }
                    updateYPlayerOne(tempOne);
                }
                else {
                    tempTwo += paddleMove;
                    if (tempTwo+0.4 >= 1.0){
                        tempTwo = 0.6;
                    }
                    updateYPlayerTwo(tempTwo);
                }
            }
            // checking if down arrow
            else if (e.keyCode === 40){
                if (playerOne === 0){
                    tempOne -= paddleMove;
                    if (tempOne-0.4 <= -1.0){
                        tempOne = -0.6;
                    }
                    updateYPlayerOne(tempOne);
                }
                else {
                   tempTwo -= paddleMove;
                    if (tempTwo-0.4 <= -1.0){
                        tempTwo = -0.6;
                    }
                    updateYPlayerTwo(tempTwo);
                }
            }
        }
        

    }

    function resetGame() {
        gameOn = true;
        newBallX.current = 0;
        newBallY.current = 0;
        updateYPlayerOne(0);
        updateYPlayerTwo(0);
    }

    function calcYVelocity(player){
        console.log("the ball y: ", newBallY.current);
        console.log("the ball x: ", newBallX.current);
        if(newBallY.current > player){
            var amountYVelocity = newBallY.current - player;
            amountYVelocity = (amountYVelocity / 0.4) * Math.abs(newVelX.current);
            newVelY.current = amountYVelocity;
        }
        else if (newBallY.current < player){
            var amountYVelocity = player - newBallY.current;
            amountYVelocity = (amountYVelocity / 0.4) * Math.abs(newVelX.current) * -1;
            newVelY.current = amountYVelocity;
        }
        else {
            newVelY.current = 0;
        }
    }

};

export default Pong; 
