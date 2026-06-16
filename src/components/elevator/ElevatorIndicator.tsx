import { Text } from "@react-three/drei";
import { floorContent } from "../../data/floorContent";
import type { ElevatorState } from "../../hooks/useElevator";

type Props = {
  currentFloor: number;
  targetFloor: number;
  state: ElevatorState;
};

function ElevatorIndicator({
  currentFloor,
  targetFloor,
  state,
}: Props) {
  const floorName =
    floorContent[currentFloor].title;

  let status = "READY";

  if (state === "moving") {
    status =
      targetFloor > currentFloor
        ? "▲ MOVING"
        : "▼ MOVING";
  }

  if (state === "openingDoors") {
    status = "ARRIVED";
  }

  return (
    <group position={[0, 2.3, 1.1]}>
      <mesh>
        <boxGeometry args={[2.4, 1.1, 0.08]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, 0.38, 0.05]}>
        <boxGeometry args={[2.3, 0.22, 0.02]} />

        <meshStandardMaterial
          color={
            state === "openingDoors"
              ? "#00ff88"
              : "#f3c623"
          }
        />
      </mesh>

      <Text
        position={[0, 0.38, 0.08]}
        fontSize={0.1}
        color="#111"
        anchorX="center"
        anchorY="middle"
      >
        {status}
      </Text>

      <Text
        position={[0, 0.02, 0.08]}
        fontSize={0.18}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {floorName.toUpperCase()}
      </Text>

      <Text
        position={[0, -0.32, 0.08]}
        fontSize={0.14}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        FLOOR {String(currentFloor).padStart(2, "0")}
      </Text>
    </group>
  );
}

export default ElevatorIndicator;