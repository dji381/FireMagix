uniform float size;
uniform float scale;
uniform float height;
uniform float uTime;
uniform float uVerticalSpeed;
uniform float uParticleSystemWidth;
uniform float uAnimationProgress;
varying vec3 vPos;

#include "../../../lygia/generative/fbm.glsl
void main() {
    vec3 pos = position;
    float x = uTime * uVerticalSpeed * 0.1;
    pos.y = mod(pos.y + x * uAnimationProgress, height);
    pos.xz *= uParticleSystemWidth;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (scale / length(mvPosition.xyz));
    gl_Position = projectionMatrix * mvPosition;
    vPos = pos;
}