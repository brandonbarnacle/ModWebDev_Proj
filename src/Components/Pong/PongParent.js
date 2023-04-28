import PongChild from "./PongChild.js";

const PongParent = () => {
    return (
        <div>
                <div>
                    <div>
                        <canvas id="gl-canvas" width="1024" height="512"></canvas>
                        <div>
                            <h1 id="score"></h1>
                        </div>
                        <PongChild />
                    </div>
                </div>
        </div>
    );
};

export default PongParent;