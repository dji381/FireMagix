uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform sampler2D uTexture;
varying vec3 vPos;

void main(){
    vec2 center = vec2(0.0);
    float dist = distance(center,vPos.xz);
    vec3 color = mix(uPrimaryColor,uSecondaryColor,smoothstep(0.0,0.5,dist));
    vec4 texel = texture2D(uTexture,gl_PointCoord);
    texel.r = texel.x - vPos.y *0.7;
    if(texel.r < 0.1){
        discard;
    }
    color = texel.xyz * color;
    color *= 5.0;
    gl_FragColor = vec4(color,texel.r);
}