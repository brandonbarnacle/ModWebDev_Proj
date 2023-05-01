import initShaders from "../../Common/WebGL/Common/initShaders";
import setupWebGL from "../../Common/WebGL/Common/webgl-util";
import { vec2, vec4, flatten, perspective } from "../../Common/WebGL/Common/MV";
import vert from "../../Common/WebGL/Shaders/Pong/pong-vert.js";
import frag from "../../Common/WebGL/Shaders/Pong/pong-frag.js";
import Parse from "parse";

const Pong = ({yPlayerOneArg, yPlayerTwoArg, startGame, updateYPlayerOne, updateYPlayerTwo, setIsWinner, setGameOver, isPlayerOne, velX, velY, ballX, ballY, playerOneScoreArg, playerTwoScoreArg, setPlayerTwoScore, setPlayerOneScore, setBallX, setBallY, setVelX, setVelY}) => {
    // Variables for WedGL script
    var gl;
    var vertices = [];
    var u_ColorLoc;
    var u_vCenterLoc;
    var xCenterBall, yCenterBall;
    var xVelocityBall, yVelocityBall;
    var xPlayerOne, yPlayerOne;
    var xPlayerTwo, yPlayerTwo;
    var playerOneScore, playerTwoScore;
    var u_projMatrixLoc;
    var extentBall = 0.1;
    var paddleMove = 0.1; 
    var playerOne;

    var gameOn;
    
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
    var u_projMatrixLoc = gl.getUniformLocation( program, "u_projMatrix" );
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
        xCenterBall = ballX;
        yCenterBall = ballY;
        var p = vec2(0.0);
        vertices.push(p);
        var radius = 0.1;

        // set initial ball velocity, random side start
        yVelocityBall = velY;
        xVelocityBall = velX; 

        // set up rest of ball points
        var increment = Math.PI/36;
        for (var theta=0.0; theta < Math.PI*2-increment; theta+=increment) {
            if (theta==0.0) {
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
        if (startGame){
            gameOn = true;
        }
        else {
            gameOn = false;
        }   

        // clear buffer
        gl.clear(gl.COLOR_BUFFER_BIT);

        // draw sphere
        gl.uniform4fv(u_ColorLoc, vec4(0.4, 0.4, 1.0, 1.0));
        gl.uniform2fv (u_vCenterLoc, vec2(xCenterBall, yCenterBall));
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

        if(gameOn){
            animate();
        } 

        window.requestAnimFrame(render);
    }

    function animate() {
        // update all from data base;
        yPlayerOne = yPlayerOneArg;
        yPlayerTwo = yPlayerTwoArg;
        xCenterBall = ballX;
        yCenterBall = ballY;
        xVelocityBall = velX;
        yVelocityBall = velY;
        playerOneScore = playerOneScoreArg;
        playerTwoScore = playerTwoScoreArg;
        document.getElementById("score").innerHTML = "Player One: " + playerOneScore + " | Player Two: " + playerTwoScore;

        if (playerOne === 0){
            // increment xCenter and yCenter
            // setBallX(xCenterBall + xVelocityBall);
            // setBallX(yCenterBall + yVelocityBall);

            // check if hit player one paddle
            if (xCenterBall-extentBall <= xPlayerOne+0.1){
                if(yCenterBall-extentBall/2 <= yPlayerOne+0.4 && yCenterBall-extentBall/2 >= yPlayerOne-0.4){
                    // reverse x velocity
                    // setBallX(-1.9 + extentBall);
                    setVelX(-xVelocityBall);
                    // calculate y angle velocity
                    calcYVelocity(yPlayerOne);
                }
                else if(yCenterBall+extentBall/2 <= yPlayerOne+0.4 && yCenterBall+extentBall/2 >= yPlayerOne-0.4){
                    // setBallX(-1.9 + extentBall);
                    setVelX(-xVelocityBall);
                    // calculate y angle velocity
                    calcYVelocity(yPlayerOne);
                }
            }

            // check if hit player two padde
            else if (xCenterBall+extentBall >= xPlayerTwo-0.1){
                if(yCenterBall-extentBall/2 <= yPlayerTwo+0.4 && yCenterBall-extentBall/2 >= yPlayerTwo-0.4) {
                    // setBallX(1.9 - extentBall);
                    setVelX(-xVelocityBall);
                    // calculate y angle velocity
                    calcYVelocity(yPlayerTwo);
                }
                else if(yCenterBall+extentBall/2 <= yPlayerTwo+0.4 && yCenterBall+extentBall/2 >= yPlayerTwo-0.4) {
                    // setBallX(1.9 - extentBall);
                    setVelX(-xVelocityBall);
                    // calculate y angle velocity
                    calcYVelocity(yPlayerTwo);
                }
            }

            // check if hit top or bottom
            if(yCenterBall+extentBall >= 1.0) {
                // setBallY(1.0 - extentBall);
                setVelY(-yVelocityBall);
            }
            if(yCenterBall-extentBall <= -1.0){
                // setBallY(-1.0 + extentBall);
                setVelY(-yVelocityBall);
            }

            // check if score
            if(xCenterBall+extentBall >= 2.0) {
                setVelY(0);
                setVelX(0.02);
                setPlayerOneScore(playerOneScore + 1);
                gameOn = false;
                setTimeout(() => {
                    resetGame();
                }, 2000);
            } 
            if(xCenterBall-extentBall <= -2.0) {
                setVelY(0);
                setVelX(-0.02);
                setPlayerTwoScore(playerTwoScore + 1);
                gameOn = false;
                setTimeout(() => {
                    resetGame();
                }, 2000);
            }

            // check if game won
            if(playerOneScore >= 3) {
                gameOn = false;
                if(playerOne === 0){
                    setIsWinner(true);
                }
                setGameOver(true);
                alert("Player One Won!");
            }
            if (playerTwoScore >= 3){
                gameOn = false;
                if(playerOne === 1){
                    setIsWinner(true);
                }
                setGameOver(true);
                alert("Player Two Won!");
            }
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
                if (playerOne === 0){
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
        setBallX(0);
        setBallY(0);
        updateYPlayerOne(0)
        updateYPlayerTwo(0);
    }

    function calcYVelocity(player){
        if(yCenterBall > player){
            var amountYVelocity = yCenterBall - player;
            amountYVelocity = (amountYVelocity / 0.4) * Math.abs(xVelocityBall);
            setVelY(amountYVelocity);
        }
        else if (yCenterBall < player){
            var amountYVelocity = player - yCenterBall;
            amountYVelocity = (amountYVelocity / 0.4) * Math.abs(xVelocityBall) * -1;
            setVelY(amountYVelocity);
        }
        else {
            setVelY(0);
        }
    }

};

export default Pong; 
