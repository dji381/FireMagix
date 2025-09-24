uniform float uTime;
uniform float uBumpIntensity;
varying vec2 vUvs;
varying vec3 vNormals;
varying vec3 vPosition;
varying float vBump;

#include "../../lygia/generative/fbm.glsl"
void main() {

  vec3 newPos = position;
  vec2 centeredUV = uv - 0.5;
  float noise = fbm((uv * 5.0)) * 0.1;
  float dist = length(centeredUV);
  float bump = abs(sin(dist * 10.0 - uTime * 2.0));
  
  newPos.z += bump * uBumpIntensity;
  newPos.z += noise * 0.3;
  csm_Position = newPos;
  vUvs = uv;
  vNormals = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vBump = bump;
}