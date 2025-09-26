import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CheckerBoard = () => {
  const texture = useTexture("/textures/2415225_s.jpg");
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);

  return (
    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
      <planeGeometry args={[500, 500, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default CheckerBoard;
