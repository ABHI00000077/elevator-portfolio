import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  isClosed: boolean;
};

function ElevatorDoors({ isClosed }: Props) {
  const leftDoor = useRef<THREE.Mesh>(null!);
  const rightDoor = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    const leftTarget = isClosed ? -0.61 : -1.2;
    const rightTarget = isClosed ? 0.61 : 1.2;

    if (leftDoor.current) {
      leftDoor.current.position.x +=
        (leftTarget - leftDoor.current.position.x) * 0.08;
    }

    if (rightDoor.current) {
      rightDoor.current.position.x +=
        (rightTarget - rightDoor.current.position.x) * 0.08;
    }
  });

  return (
    <>
      <mesh ref={leftDoor} position={[-1.2, 0, 1.01]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 0.08]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>

      <mesh ref={rightDoor} position={[1.2, 0, 1.01]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.4, 0.08]} />
        <meshStandardMaterial color="#8a8a8a" />
      </mesh>
    </>
  );
}

export default ElevatorDoors;