attribute float aSpawnTime;
uniform float size;
uniform float scale;
uniform float height;
uniform float uTime;
uniform float uVerticalSpeed;
varying vec3 vPos;

void main() {
    float life = step(aSpawnTime,uTime * 0.1);
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (scale / length(mvPosition.xyz)) * life;
    gl_Position = projectionMatrix * mvPosition;
    vPos = pos;
}