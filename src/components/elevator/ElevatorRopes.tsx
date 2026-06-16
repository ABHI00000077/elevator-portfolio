function ElevatorRopes() {
  return (
    <>
      {/* Front-left cable */}
      <mesh position={[-5.75, 9, 1.02]}>
        <cylinderGeometry args={[0.03, 0.03, 23, 10]} />
        <meshStandardMaterial
          color="#666666"
          metalness={1}
          roughness={0.35}
        />
      </mesh>

      {/* Front-right cable */}
      <mesh position={[-3.25, 9, 1.02]}>
        <cylinderGeometry args={[0.03, 0.03, 23, 10]} />
        <meshStandardMaterial
          color="#666666"
          metalness={1}
          roughness={0.35}
        />
      </mesh>

      {/* Back-left cable */}
      <mesh position={[-5.75, 9, -1.02]}>
        <cylinderGeometry args={[0.03, 0.03, 23, 10]} />
        <meshStandardMaterial
          color="#666666"
          metalness={1}
          roughness={0.35}
        />
      </mesh>

      {/* Back-right cable */}
      <mesh position={[-3.25, 9, -1.02]}>
        <cylinderGeometry args={[0.03, 0.03, 23, 10]} />
        <meshStandardMaterial
          color="#666666"
          metalness={1}
          roughness={0.35}
        />
      </mesh>
    </>
  );
}

export default ElevatorRopes;