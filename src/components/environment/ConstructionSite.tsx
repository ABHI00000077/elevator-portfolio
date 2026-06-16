import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function ConstructionSite() {
  const { scene } = useGLTF(
    "/models/construction_site.glb"
  );

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      scale={4}
      position={[-7.5, -3, -8]}
      rotation={[0, 0, 0]}
    />
    
  );
}

export default ConstructionSite;

useGLTF.preload(
  "/Models/construction_site.glb"
);