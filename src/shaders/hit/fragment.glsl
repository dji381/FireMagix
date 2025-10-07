uniform vec3 uPrimaryColor;
uniform float uGlowintensity;
uniform sampler2D uTexture;
varying vec3 vPos;

void main(){
    vec4 texel = texture2D(uTexture,gl_PointCoord);
    vec3 color = texel.xyz * uPrimaryColor;
    gl_FragColor = vec4(color * uGlowintensity,texel.x);
}