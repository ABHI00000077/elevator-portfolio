import ElevatorDoors from "./ElevatorDoors";

type Props = {
  doorsClosed: boolean;
};

function ElevatorCabin({ doorsClosed }: Props) {
  return (
    <>
      {/* Floor */}
      <mesh position={[0, -1.25, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.1, 2]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[2.5, 0.1, 2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 0, -1]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 2.5, 0.1]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-1.25, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.5, 2]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[1.25, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.5, 2]} />
        <meshStandardMaterial color="#777777" />
      </mesh>

      {/* Front Doors */}
      <ElevatorDoors isClosed={doorsClosed} />
    </>
  );
}

export default ElevatorCabin;