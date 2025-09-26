uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform sampler2D uTexture;
varying vec3 vPos;

void main(){
    vec4 texel = texture2D(uTexture,gl_PointCoord);
    gl_FragColor = vec4(texel.xyz,texel.x);
}