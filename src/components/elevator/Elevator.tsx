import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

import ElevatorIndicator from "./ElevatorIndicator";
import { FLOOR_HEIGHT } from "../../data/floor";
import type { ElevatorState } from "../../hooks/useElevator";
import ElevatorCabin from "./ElevatorCabin";

type Props = {
  currentFloor: number;
  targetFloor: number;
  state: ElevatorState;
  doorsClosed: boolean;
  elevatorYRef: MutableRefObject<number>;
};

function Elevator({
  currentFloor,
  targetFloor,
  state,
  doorsClosed,
  elevatorYRef,
}: Props) {
  const groupRef = useRef<THREE.Group>(null!);

  const currentY =
    currentFloor * FLOOR_HEIGHT - 0.8;

  const targetY =
    targetFloor * FLOOR_HEIGHT - 0.8;

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const desiredY =
      state === "moving"
        ? targetY
        : currentY;

    const speed =
      state === "moving"
        ? 0.01
        : 0.05;

    group.position.y +=
      (desiredY - group.position.y) *
      speed;

    elevatorYRef.current =
      group.position.y;
  });

  return (
    <group
      ref={groupRef}
      position={[-4.5, currentY, 0]}
    >
      <ElevatorIndicator
        currentFloor={currentFloor}
        targetFloor={targetFloor}
        state={state}
      />

      <ElevatorCabin
        doorsClosed={doorsClosed}
      />
    </group>
  );
}

export default Elevator;