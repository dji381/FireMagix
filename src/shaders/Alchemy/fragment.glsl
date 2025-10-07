uniform vec3 uPrimaryColor;
uniform sampler2D uAlchemyTexture;
uniform float uTime;
uniform float uAlpha;
varying vec2 vUvs;

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}
void main() {
    vec2 rotatedUvs = rotateUV(vUvs,3.14 + uTime * 0.1);
    vec4 texel = texture2D(uAlchemyTexture,rotatedUvs);
    vec3 colour = uPrimaryColor * texel.xyz;
    float alpha = min(uAlpha,texel.r);
    csm_Emissive = colour * (2.0 + abs(sin(uTime * 0.1)) * 0.7);
    csm_DiffuseColor = vec4(colour,alpha);
}