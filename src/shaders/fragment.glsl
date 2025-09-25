uniform vec3 uDisplacementColor;
uniform vec3 uSecondaryColor;
uniform float uGlowPower;
uniform float uAlphaIntensity;
uniform float uSecondaryRadius;
uniform float uTime;
varying vec2 vUvs;
varying vec3 vNormals;
varying vec3 vPosition;
varying float vBump;

#include "../../lygia/generative/fbm.glsl"
#include "../../lygia/math/saturate.glsl

void main() {
    vec2 center = vec2(0.5);
    float noise = fbm((vUvs * 5.0));
    float d = distance(center, vUvs);
    if(d + noise * 0.2 > 0.5) {
        discard;
    }

    noise = vBump + noise;
    vec3 color = mix(uSecondaryColor, uDisplacementColor, smoothstep(uSecondaryRadius, 1.0, noise));
    noise = saturate(noise);
    csm_Emissive = color * uGlowPower;
    csm_DiffuseColor = vec4(color, smoothstep(0.0,uAlphaIntensity,noise));
}