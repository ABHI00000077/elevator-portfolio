function Shaft() {
  return (
    <>
      {/* Far background wall */}
      <mesh position={[0, 10, -10]}>
        <boxGeometry args={[26, 28, 0.5]} />
        <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
      </mesh>

      {/* Left shaft wall */}
      <mesh position={[-10.5, 10, 0]}>
        <boxGeometry args={[0.5, 28, 22]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} metalness={0} />
      </mesh>

      {/* Right shaft wall */}
      <mesh position={[10.5, 10, 0]}>
        <boxGeometry args={[0.5, 28, 22]} />
        <meshStandardMaterial color="#0b0b0b" roughness={1} metalness={0} />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 24, 0]}>
        <boxGeometry args={[26, 0.4, 22]} />
        <meshStandardMaterial color="#090909" roughness={1} metalness={0} />
      </mesh>

      {/* Bottom beam */}
      <mesh position={[0, -4, 0]}>
        <boxGeometry args={[26, 0.4, 22]} />
        <meshStandardMaterial color="#090909" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

export default Shaft;