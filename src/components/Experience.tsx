import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FireMagix from "./FireMagix";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1.5}/>
      <FireMagix/>
      <EffectComposer>
        <Bloom
          intensity={1.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
        />
      </EffectComposer>
    </>
  );
};

export default Experience;