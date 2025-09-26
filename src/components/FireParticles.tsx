import { useControls } from "leva";
import vertexShader from "@/shaders/particles/vertex.glsl";
import fragmentShader from "@/shaders/particles/fragment.glsl";
import { useMemo, useRef } from "react";
import type { ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const FireParticles = () => {
  const shaderRef = useRef<null | ShaderMaterial>(null);
  const texture = useTexture("/textures/fireTexture.jpg");
  texture.flipY = false;
  const { count, particleSystemWidth } = useControls("Particles", {
    uPrimaryColor: {
        value:"#ba2424",
        onChange: (val) => {
            if (shaderRef.current) shaderRef.current.uniforms.uPrimaryColor.value = new THREE.Color(val);
          },
    },
    uSecondaryColor: {
        value:"#ffa300",
        onChange: (val) => {
            if (shaderRef.current) shaderRef.current.uniforms.uSecondaryColor.value = new THREE.Color(val);
          },
    },
    size: {
      value: 38,
      min: 0,
      max: 100,
      step: 1,
      onChange: (val) => {
        if (shaderRef.current) shaderRef.current.uniforms.size.value = val;
      },
    },
    scale: {
      value: 1.0,
      min: 0,
      max: 10,
      step: 0.1,
      onChange: (val) => {
        if (shaderRef.current) shaderRef.current.uniforms.scale.value = val;
      },
    },
    height: {
      value: 2,
      min: 0,
      max: 20,
      step: 0.1,
      onChange: (val) => {
        if (shaderRef.current) shaderRef.current.uniforms.height.value = val;
      },
    },
    uVerticalSpeed: {
      value: 0.1,
      min: 0,
      max: 20,
      step: 0.1,
      onChange: (val) => {
        if (shaderRef.current)
          shaderRef.current.uniforms.uVerticalSpeed.value = val;
      },
    },
    count: {
      value: 200,
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
      scale: { type: "f", value: 1.0 },
      height: { type: "f", value: 2.0 },
      uTime: { type: "f", value: 0 },
      uVerticalSpeed: { value: 0.1 },
      uPrimaryColor : {value: new THREE.Color("#b54221")},
      uSecondaryColor : {value: new THREE.Color("#db8503")},
      uTexture:{value:texture}

    }),
    []
  );
  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const r = Math.random() * (particleSystemWidth * 0.5);
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = Math.random() * 2.0;
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count, particleSystemWidth]);
  useFrame(({ clock }) => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value = clock.elapsedTime * 10;
  });
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
          args={[particlesPosition, 3]}
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
      />
    </points>
  );
};

export default FireParticles;
