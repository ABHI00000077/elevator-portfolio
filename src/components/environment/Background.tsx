import { useGLTF } from "@react-three/drei";

export default function BackgroundBuildings() {
  const { scene } = useGLTF(
    "/models/backgroundbuildings.glb"
  );

  return (
    <primitive
      object={scene}
      scale={4}
      position={[-5, -3.5, -35]}
      rotation={[0, -Math.PI/2, 0]}
    />
    
  );
}