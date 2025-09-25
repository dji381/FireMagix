import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import { useRef } from "react";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

const FIreMagix = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderRef = useRef<any>(null!);
  const { uDisplacementColor, uSecondaryColor, uGlowPower, uBumpIntensity,uAlphaIntensity,uSecondaryRadius } =
    useControls({
      uDisplacementColor: "#b54221",
      uSecondaryColor: "#db8503",
      uGlowPower: {
        value: 2.0,
        min: 1.0,
        max: 30,
        step: 1.0,
      },
      uBumpIntensity: {
        value: 0.01,
        min: 0.01,
        max: 1.0,
        step: 0.01,
      },
      uSecondaryRadius: {
        value: 0.8,
        min: 0.1,
        max: 1.0,
        step: 0.1,
      },
      uAlphaIntensity: {
        value: 0.7,
        min: 0.1,
        max: 1.0,
        step: 0.1,
      },
    });
  useFrame((state) => {
    if (shaderRef.current?.uniforms) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  return (
    <>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[1, 1, 250, 250]} />
        <CustomShaderMaterial<typeof THREE.MeshStandardMaterial>
          baseMaterial={THREE.MeshStandardMaterial}
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent={true}
          alphaTest={0.5}
          uniforms={{
            uDisplacementColor: { value: new THREE.Color(uDisplacementColor) },
            uSecondaryColor: { value: new THREE.Color(uSecondaryColor) },
            uGlowPower: { value: uGlowPower },
            uTime: { value: 0.0 },
            uBumpIntensity: { value: uBumpIntensity },
            uAlphaIntensity:{value:uAlphaIntensity},
            uSecondaryRadius:{value:uSecondaryRadius}
          }}
        />
      </mesh>
      <mesh position={[0, -0.0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[1, 1, 250, 250]} />
      <meshStandardMaterial color={0x555555} />
      </mesh>
    </>
  );
};

export default FIreMagix;
