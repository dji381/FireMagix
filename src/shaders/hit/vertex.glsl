attribute float aSpawnTime;
attribute float aScale;
uniform float size;
uniform float uTime;
varying vec3 vPos;

void main() {
    float life = smoothstep(0.0,aSpawnTime,uTime);
    life= pow(life,8.0);
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (aScale / length(mvPosition.xyz)) * life;
    gl_Position = projectionMatrix * mvPosition;
    vPos = pos;
}