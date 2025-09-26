import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FireMagix from "./FireMagix";
import CheckerBoard from "./CheckerBoard";

const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5}/>
      <FireMagix/>
      <CheckerBoard/>
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