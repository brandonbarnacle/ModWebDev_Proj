export default `
    attribute vec4 a_vPosition;
    uniform vec2 u_vCenter;
    uniform mat4 u_projMatrix;

    void main()
    { 
        gl_Position = u_projMatrix * vec4(a_vPosition.x + u_vCenter.x, 
                        a_vPosition.y + u_vCenter.y, 
                        -2.0, 
                        1.0);
    }
`;