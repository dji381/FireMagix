/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import vertexShaderAlchemy from "@/shaders/Alchemy/vertex.glsl";
import fragmentShaderAlchemy from "@/shaders/Alchemy/fragment.glsl";
import vertexShaderfireball from "@/shaders/fireball/vertex.glsl";
import fragmentShaderfireball from "@/shaders/fireball/fragment.glsl";
import { useRef } from "react";
import { folder, useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import FireParticles from "./FireParticles";
import HitParticles from "./HitParticles";

const FIreMagix = () => {
  const shaderRef = useRef<any>(null!);
  const shaderAlchemyRef = useRef<any>(null!);
  const shaderFireballRef = useRef<any>(null!);
  const alechemyTexture = useTexture('/textures/alchemy.jpg');
  const {
    uDisplacementColor,
    uSecondaryColor,
    uGlowPower,
    uBumpIntensity,
    uAlphaIntensity,
    uSecondaryRadius,
    uPrimaryColor,
    uPrimaryFireBallColor,
    uSecondaryFireBallColor,
    uRayFireBallColor,
    uGlowFire,
    uFresnelFire,
    
  } = useControls("FireMagix", {
    Lava: folder({
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
    }),
    Alchemy: folder({
      uPrimaryColor: "#6f1f08",
    }),
    Fireball:folder({
      uPrimaryFireBallColor:"#b54221",
      uSecondaryFireBallColor: "#db8503",
      uRayFireBallColor: "#581d0f",
      uGlowFire: {
        value: 5.0,
        min:1.0,
        max:10.0,
        step: 1,
      },
       uFresnelFire: {
        value: 1.5,
        min:1.0,
        max:10.0,
        step: 0.5,
      }
    })
  });
  useFrame((state) => {
    if (shaderRef.current?.uniforms) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      shaderAlchemyRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      shaderFireballRef.current.uniforms.uTime.value = state.clock.elapsedTime;
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
            uAlphaIntensity: { value: uAlphaIntensity },
            uSecondaryRadius: { value: uSecondaryRadius },
          }}
        />
      </mesh>
      {/* Alchemy effect */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeGeometry args={[1.5, 1.5, 1, 1]} />
        <CustomShaderMaterial<typeof THREE.MeshStandardMaterial>
          baseMaterial={THREE.MeshStandardMaterial}
          ref={shaderAlchemyRef}
          vertexShader={vertexShaderAlchemy}
          fragmentShader={fragmentShaderAlchemy}
          transparent={true}
          alphaTest={0.1}
          uniforms={{
            uAlchemyTexture:{value:alechemyTexture},
            uPrimaryColor:{value:new THREE.Color(uPrimaryColor)},
            uTime: { value: 0.0 },
          }}
        />
      </mesh>
      {/* Fireball */}
         <mesh position={[0, 0.0, 0]}>
        <sphereGeometry args={[.3]} />
        <CustomShaderMaterial<typeof THREE.MeshStandardMaterial>
          baseMaterial={THREE.MeshStandardMaterial}
          ref={shaderFireballRef}
          vertexShader={vertexShaderfireball}
          fragmentShader={fragmentShaderfireball}
          transparent={true}
          alphaTest={0.5}
          uniforms={{
            uPrimaryFireBallColor:{value:new THREE.Color(uPrimaryFireBallColor)},
            uSecondaryFireBallColor:{value:new THREE.Color(uSecondaryFireBallColor)},
            uRayFireBallColor:{value: new THREE.Color(uRayFireBallColor)},
            uTime: { value: 0.0 },
            uGlowFire:{value:uGlowFire},
            uFresnelFire:{value:uFresnelFire}
          }}
        />
      </mesh>
      {/* <FireParticles/> */}
      <HitParticles/>
    </>
  );
};

export default FIreMagix;
