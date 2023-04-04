import initShaders from "../../Common/WebGL/Common/initShaders";
import setupWebGL from "../../Common/WebGL/Common/webgl-util";
import { vec2, vec3, flatten } from "../../Common/WebGL/Common/MV";
import vert from "../../Common/WebGL/Shaders/Pong/pong-vert.js";
import frag from "../../Common/WebGL/Shaders/Pong/pong-frag.js";


const PongChild = ({game}) => {

    console.log(vert);
    console.log(frag);

    // Variables for WedGL script

    var gl;
    var vertices = [];
    var u_ColorLoc;
    var u_vPositionLoc;
    var ballPosition;
    var ballVelocityX;
    var ballVelocityY;
    var ballRadius;
    var numBallVertices;
    var numPaddleVertices;
    var paddlePosition;
    var paddleStepSize;
    var paddleMoveRight = false;
    var paddleMoveLeft = false;
    var paddleHeight;
    var paddleWidth;
    var gameOver = false;
    var numBounces;
    var numBouncesElem;

    function setup() {
        // draw ball
        var p = vec2(0.0, 0.0);
        ballRadius = 0.05;
        vertices.push(p);
        vertices.push(vec2(ballRadius, 0.0));
        numBallVertices = 2;
        var increment = Math.PI / 36;
        for (var theta = 0.0; theta < Math.PI * 2 - increment; theta += increment) {
            vertices.push(
            vec2(
                Math.cos(theta + increment) * ballRadius,
                Math.sin(theta + increment) * ballRadius
            )
            );
            numBallVertices++;
        }
        ballPosition = vec2(0.0, 0.0);
        ballVelocityX = 0.001;
        ballVelocityY = -0.001;
        numBounces = 0;

        // draw paddle
        paddleWidth = 0.5;
        paddleHeight = 0.05;
        vertices.push(vec2(-paddleWidth / 2.0, -1.0));
        vertices.push(vec2(paddleWidth / 2.0, -1.0));
        vertices.push(vec2(paddleWidth / 2.0, -1.0 + paddleHeight));
        vertices.push(vec2(-paddleWidth / 2.0, -1.0 + paddleHeight));
        numPaddleVertices = 4;
        paddleStepSize = 0.1;
        paddlePosition = vec2(0.0, 0.0);
    }

    function animate() {
        if (!gameOver) {
            // paddle movement
            if (paddleMoveRight && paddlePosition[0] + paddleStepSize <= 1) {
            paddlePosition[0] += paddleStepSize;
            paddleMoveRight = false;
            } else if (paddleMoveLeft && paddlePosition[0] - paddleStepSize >= -1) {
            paddlePosition[0] -= paddleStepSize;
            paddleMoveLeft = false;
            }

            // ball movement
            if (
            ballPosition[0] + ballRadius >= 1.0 ||
            ballPosition[0] - ballRadius <= -1.0
            ) {
            ballVelocityX = -ballVelocityX;
            }
            if (
            ballPosition[1] - ballRadius <= -1.0 + paddleHeight &&
            ballPosition[0] <= paddlePosition[0] + paddleWidth / 2.0 &&
            ballPosition[0] >= paddlePosition[0] - paddleWidth / 2.0
            ) {
            ballVelocityY = -ballVelocityY;
            numBounces++;
            numBouncesElem.innerHTML = numBounces;
            }
            if (ballPosition[1] + ballRadius >= 1.0) {
            ballVelocityY = -ballVelocityY;
            }
            if (ballPosition[1] - ballRadius < -1.0) {
            alert("Game Over!");
            gameOver = true;
            } else {
            ballPosition[0] += ballVelocityX;
            ballPosition[1] += ballVelocityY;
            }
        }
    }

    function render() {
        animate();

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform3fv(u_ColorLoc, vec3(0.4, 0.4, 1.0));
        gl.uniform2fv(u_vPositionLoc, ballPosition);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, numBallVertices);

        gl.uniform3fv(u_ColorLoc, vec3(1.0, 0.4, 0.4));
        gl.uniform2fv(u_vPositionLoc, paddlePosition);
        gl.drawArrays(gl.TRIANGLE_FAN, numBallVertices, numPaddleVertices);

        window.requestAnimFrame(render);
    }

    // create WebGL context which is a JavaScript object that contains all the WebGL
    // functions and parameters
    // "gl-canvas" is the id of the canvas specified in the HTML file
    var canvasId = "gl-canvas";

    var canvas = document.getElementById(canvasId);

    console.log(canvas);

    gl = setupWebGL(canvas);
    if (!gl) {
        return (
            <h1>WebGL Loading...</h1>
        )
    }
    else
    {
        setup();

        //
        //  Configure WebGL
        //
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.8, 0.8, 0.8, 1.0);

        //  Load shaders and initialize attribute buffers

        var program = initShaders(gl, vert, frag);
        gl.useProgram(program);

        // Load the data into the GPU

        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

        // Associate out shader variables with our data buffer

        var a_vPositionLoc = gl.getAttribLocation(program, "a_vPosition");
        gl.vertexAttribPointer(a_vPositionLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_vPositionLoc);

        u_ColorLoc = gl.getUniformLocation(program, "u_Color");
        u_vPositionLoc = gl.getUniformLocation(program, "u_vPosition");

        // paddle control
        var l = document.getElementById("paddle-left");
        var r = document.getElementById("paddle-right");

        l.addEventListener("click", function () {
            paddleMoveRight = false;
            paddleMoveLeft = true;
        });

        r.addEventListener("click", function () {
            paddleMoveRight = true;
            paddleMoveLeft = false;
        });

        // ball control
        var u = document.getElementById("speed-up");
        var d = document.getElementById("slow-down");

        u.addEventListener("click", function () {
            if (ballVelocityX < 0) {
            ballVelocityX -= 0.001;
            } else {
            ballVelocityX += 0.001;
            }
            if (ballVelocityY < 0) {
            ballVelocityY -= 0.001;
            } else {
            ballVelocityY += 0.001;
            }
        });
        d.addEventListener("click", function () {
            if (ballVelocityX !== 0) {
            if (ballVelocityX < 0) {
                ballVelocityX += 0.001;
            } else {
                ballVelocityX -= 0.001;
            }
            }
            if (ballVelocityY !== 0) {
            if (ballVelocityY < 0) {
                ballVelocityY += 0.001;
            } else {
                ballVelocityY -= 0.001;
            }
            }
        });

        // bounce count
        numBounces = 0;
        numBouncesElem = document.getElementById("num-bounces");
        numBouncesElem.innerHTML = numBounces;

        render();
    }

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
