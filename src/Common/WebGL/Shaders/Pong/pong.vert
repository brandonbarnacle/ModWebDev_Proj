attribute vec4 a_vPosition;
uniform vec2 u_vPosition;

void main()
{ 
    gl_Position = vec4(a_vPosition.x + u_vPosition.x, 
                       a_vPosition.y + u_vPosition.y, 
                       0.0, 
                       1.0);
}