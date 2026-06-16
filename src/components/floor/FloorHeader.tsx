import { Text } from "@react-three/drei";

type Props = {
  floorNumber: number;
  title: string;
};

function FloorHeader({ floorNumber, title }: Props) {
  return (
    <group position={[0, 3.9, 0]}>
      {/* Main board */}
      <mesh>
        <boxGeometry args={[5.6, 1.15, 0.1]} />
        <meshStandardMaterial color="#ece7d8" roughness={0.95} />
      </mesh>

      {/* Top strip */}
      <mesh position={[0, 0.38, 0.05]}>
        <boxGeometry args={[5.45, 0.28, 0.02]} />
        <meshStandardMaterial color="#f3c623" />
      </mesh>

      <Text
        position={[0, 0.38, 0.08]}
        fontSize={0.14}
        color="#222"
        anchorX="center"
        anchorY="middle"
      >
        CONSTRUCTION LEVEL
      </Text>

      <Text
        position={[0, -0.04, 0.08]}
        fontSize={0.28}
        color="#111"
        anchorX="center"
        anchorY="middle"
      >
        FLOOR {floorNumber}
      </Text>

      <Text
        position={[0, -0.36, 0.08]}
        fontSize={0.2}
        color="#111"
        anchorX="center"
        anchorY="middle"
      >
        {title.toUpperCase()}
      </Text>
    </group>
  );
}

export default FloorHeader;