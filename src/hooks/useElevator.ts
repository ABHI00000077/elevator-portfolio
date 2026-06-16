import { useState } from "react";

export type ElevatorState =
  | "idle"
  | "zoomingIn"
  | "closingDoors"
  | "moving"
  | "openingDoors"
  | "zoomingOut";

export function useElevator() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(0);
  const [state, setState] = useState<ElevatorState>("idle");
  const [doorsClosed, setDoorsClosed] = useState(false);

  return {
    currentFloor,
    setCurrentFloor,
    targetFloor,
    setTargetFloor,
    state,
    setState,
    doorsClosed,
    setDoorsClosed,
  };
}