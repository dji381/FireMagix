import { useControls } from "leva";
import vertexShader from "@/shaders/hit/vertex.glsl";
import fragmentShader from "@/shaders/hit/fragment.glsl";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import type { ShaderMaterial } from "three";
import type {RefObject } from "react";

interface HitParticlesProps {
  shaderRef: RefObject<ShaderMaterial | null>;
}

const HitParticles = ({ shaderRef }: HitParticlesProps) => {
  const texture = useTexture("/textures/hit.jpg");
  texture.flipY = false;
  const { count, particleSystemWidth, height } = useControls("Hit", {
    uPrimaryColor: {
      value: "#de8f07",
      onChange: (val) => {
        if (shaderRef.current)
          shaderRef.current.uniforms.uPrimaryColor.value = new THREE.Color(val);
      },
    },
    uGlowintensity: {
      value: 50.0,
      min: 0,
      max: 100,
      step: 1,
      onChange: (val) => {
        if (shaderRef.current)
          shaderRef.current.uniforms.uGlowintensity.value = val
      },
    },
    size: {
      value: 100,
      min: 0,
      max: 100,
      step: 1,
      onChange: (val) => {
        if (shaderRef.current) shaderRef.current.uniforms.size.value = val;
      },
    },
    height: {
      value: 0.5,
      min: 0,
      max: 20,
      step: 0.1,
    },
    count: {
      value: 5,
      min: 0,
      max: 5000,
      step: 100,
    },
    particleSystemWidth: {
      value: 1,
      min: 0,
      max: 100,
      step: 1,
    },
  });
  const uniforms = useMemo(
    () => ({
      size: { type: "f", value: 6.0 },
      uTime: { type: "f", value: 0 },
      uGlowintensity:{value:50.0},
      uVerticalSpeed: { value: 0.1 },
      uPrimaryColor: { value: new THREE.Color("#b54221") },
      uTexture: { value: texture },
    }),
    [texture]
  );
  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const spawnTimes = new Float32Array(count);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const r = Math.random() * (particleSystemWidth * 0.5);
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = Math.random() * height;
      const scale = THREE.MathUtils.randFloat(5,10)
      positions.set([x, y, z], i * 3);
      spawnTimes[i] = spawnTimes[i-1] ? spawnTimes[i-1] + 0.2 : 0.2;
      scales[i] = scale;
      console.log(spawnTimes)
    }

    return { positions, spawnTimes,scales };
  }, [count, height, particleSystemWidth]);
  useFrame(({ clock }) => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime * 10;
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.positions.length / 3}
          array={particlesPosition.positions}
          itemSize={3}
          args={[particlesPosition.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSpawnTime"
          count={particlesPosition.spawnTimes.length}
          array={particlesPosition.spawnTimes}
          itemSize={1}
          args={[particlesPosition.spawnTimes, 1]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={particlesPosition.scales.length}
          array={particlesPosition.scales}
          itemSize={1}
          args={[particlesPosition.scales, 1]}
        />
      </bufferGeometry>

      <shaderMaterial
        transparent={true}
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={true}
        depthWrite={false}
        alphaTest={0.5}
      />
    </points>
  );
};

export default HitParticles;
