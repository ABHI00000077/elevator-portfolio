import type { MutableRefObject } from "react";
import ConstructionSite from "../components/environment/ConstructionSite";
import CameraRig from "../components/camera/CameraRig";
import Elevator from "../components/elevator/Elevator";
import ElevatorRopes from "../components/elevator/ElevatorRopes";
import CardWall from "../components/floor/CardWall";
import type { ElevatorState } from "../hooks/useElevator";
import type { FloorPoster } from "../data/floorContent";
import { Sky } from '@react-three/drei';   
import BackgroundBuildings from "../components/environment/Background";


type Props = {
  state: ElevatorState;
  currentFloor: number;
  targetFloor: number;
  doorsClosed: boolean;
  elevatorYRef: MutableRefObject<number>;
  onPosterSelect: (poster: FloorPoster) => void;
  playPosterClick: () => void;
};

function ElevatorScene({
  state,
  currentFloor,
  targetFloor,
  doorsClosed,
  elevatorYRef,
  onPosterSelect,
  playPosterClick
}: Props) {
  return (
    <>
    <mesh
  rotation={[-Math.PI / 2, 0, 0]}
  position={[0, -3, 0]}
  receiveShadow
>
  <planeGeometry args={[2000, 2000]} />

  <meshStandardMaterial
    color="#f1d482"
  />
</mesh>
      <Sky/>

      <ambientLight intensity={0.5} />

<directionalLight
  castShadow
  position={[15, 20, 20]}
  intensity={2.5}
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
  shadow-camera-near={0.5}
  shadow-camera-far={100}
  shadow-camera-left={-40}
  shadow-camera-right={40}
  shadow-camera-top={40}
  shadow-camera-bottom={-40}
  shadow-bias={-0.0001}
  shadow-normalBias={0.035}
/>
      <directionalLight
        ref={null}
        position={[20, 20, 0]}
        color="#6a6666"
        intensity={1}
        castShadow
      />
      <BackgroundBuildings/>
      <ConstructionSite />
      <ElevatorRopes />

      <Elevator
        currentFloor={currentFloor}
        targetFloor={targetFloor}
        state={state}
        doorsClosed={doorsClosed}
        elevatorYRef={elevatorYRef}
      />

      <CardWall
        currentFloor={currentFloor}
        elevatorYRef={elevatorYRef}
        isVisible={state === "idle" || state === "zoomingOut" || state === "openingDoors"}
        onPosterSelect={onPosterSelect}
        playPosterClick={playPosterClick}
      />

      <CameraRig state={state} elevatorYRef={elevatorYRef} />
    </>
  );
}

export default ElevatorScene;