import { useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { ElevatorState } from "../../hooks/useElevator";

type Props = {
  state: ElevatorState;
  elevatorYRef: MutableRefObject<number>;
};

function CameraRig({ state, elevatorYRef }: Props) {
  const lookAtTarget = useRef(new THREE.Vector3());
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }) => {
    const elevatorCenterY = elevatorYRef.current;

    // Default / idle view
    let targetX = 3.5;
    let targetY = elevatorCenterY + 1.5;
    let targetZ = 12;

    let lookX =3.5;
    let lookY = elevatorCenterY ;
    let lookZ = 0.1;

    // Travel / close view
    if (
      state === "zoomingIn" ||
      state === "closingDoors" ||
      state === "moving" ||
      state === "openingDoors"
    ) {
      targetX = -4.5;
      targetY = elevatorCenterY + 0.2;
      targetZ = 9.5;

      lookX = -4.5;
      lookY = elevatorCenterY + 0.2;
      lookZ = 0;
    }

    desiredPosition.set(targetX, targetY, targetZ);
    desiredLookAt.set(lookX, lookY, lookZ);

    // Smooth camera motion
    camera.position.lerp(desiredPosition, 0.02);

    // Smooth look-at target
    lookAtTarget.current.lerp(desiredLookAt, 0.02);
    camera.lookAt(lookAtTarget.current);
  });

  return null;
}

export default CameraRig;