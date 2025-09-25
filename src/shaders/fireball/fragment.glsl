varying vec2 vUvs;
uniform vec3 uPrimaryFireBallColor;
uniform vec3 uSecondaryFireBallColor;
uniform vec3 uRayFireBallColor;
uniform float uTime;
uniform float uGlowFire;
uniform float uFresnelFire;
varying vec3 vNormals;
varying vec3 vPosition;
#include "../../../lygia/generative/pnoise.glsl"
#include "../../../lygia/generative/fbm.glsl"
float fresnel(float amount, vec3 normal, vec3 view) {
    return pow(1.0 - clamp(dot(normalize(normal), normalize(view)), 0.0, 1.0), amount);
}

void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 normals = normalize(vNormals);
    float f = fresnel(uFresnelFire,normals,viewDir);

    float noise = pnoise((vec3(vUvs * 10.0, uTime)), vec3(2.5, 3.0, 4.0)) * 0.5 + 0.5;
    float noiseFbm = fbm(fract(vUvs  * 5.0 + vec2(0.0,- uTime *1.2) + noise));
    vec3 color = mix(uPrimaryFireBallColor, uSecondaryFireBallColor, noise);
    color = mix(color,uRayFireBallColor, pow( 1.0 - f,2.0));
    csm_Emissive = color * uGlowFire;
     
    float alpha = 1.0 - pow( f,2.0) * 2.0 * noiseFbm * 10.0;
    csm_DiffuseColor = vec4(color,alpha);
}