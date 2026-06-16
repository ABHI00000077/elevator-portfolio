import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

import type { FloorPoster } from "../../data/floorContent";

type Props = {
  poster: FloorPoster;
  position: [number, number, number];
  onClick: () => void;
  variant?: "grid" | "profile" | "contact";
  accent?: string;
  headerText?: string;
};

function FloorCard({
  poster,
  position,
  onClick,
  variant = "grid",
  accent = "#f3c623",
  headerText = "SITE NOTICE",
}: Props) {
  const [hovered, setHovered] = useState(false);
  const posterRef = useRef<THREE.Mesh>(null!);
  const phase = useMemo(() => Math.random() * 100, []);
  const isWide = variant !== "grid";

  const posterWidth = isWide ? 6.2 : 2.4;
  const posterHeight = isWide ? 2.4 : 1.5;

  useFrame(({ clock }) => {
    if (!posterRef.current) return;

    const geometry = posterRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position;
    const time = clock.elapsedTime;
    const amplitude = isWide ? 0.03 : 0.08;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const wave = Math.sin(x * 3 + time * 2 + phase);
      const topLock = 1 - Math.max(0, (y + posterHeight / 2) / posterHeight);

      positions.setZ(i, wave * topLock * amplitude);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <group position={position}>

      {/* Soft glow backing */}
      <mesh position={[0, 0, -0.02]} scale={hovered ? 1.05 : 1}>
        <planeGeometry args={[posterWidth + 0.14, posterHeight + 0.14, 1, 1]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={hovered ? 0.12 : 0.04}
        />
      </mesh>

      {/* Main poster */}
      <mesh
        ref={posterRef}
        castShadow
        receiveShadow
        onClick={onClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
          setHovered(false);
        }}
        scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
      >
        <planeGeometry args={[posterWidth, posterHeight, 20, 10]} />
        <meshStandardMaterial
          color={hovered ? "#f7f2e1" : "#ece7d8"}
          side={THREE.DoubleSide}
          roughness={0.92}
          metalness={0.02}
          emissive={hovered ? accent : "#000000"}
          emissiveIntensity={hovered ? 0.08 : 0}
        />
      </mesh>

      {/* Header strip */}
      <mesh position={[0, posterHeight * 0.37, 0.05]}>
        <boxGeometry args={[posterWidth - 0.05, 0.28, 0.02]} />
        <meshStandardMaterial
          color={accent}
          emissive={hovered ? "#554400" : "#000000"}
          emissiveIntensity={hovered ? 0.12 : 0}
        />
      </mesh>

      <Text
        position={[0, posterHeight * 0.37, 0.08]}
        fontSize={0.12}
        color="#222"
        anchorX="center"
        anchorY="middle"
      >
        {headerText}
      </Text>

      {variant === "grid" ? (
        <>
          <Text
            position={[0, 0.12, 0.08]}
            fontSize={0.18}
            color="#111"
            anchorX="center"
            anchorY="middle"
            maxWidth={2.05}
            textAlign="center"
          >
            {poster.title}
          </Text>

          {poster.category && (
            <Text
              position={[0, -0.18, 0.08]}
              fontSize={0.09}
              color="#444"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.1}
              textAlign="center"
            >
              {poster.category.toUpperCase()}
            </Text>
          )}

          <Text
            position={[0, -0.54, 0.08]}
            fontSize={0.075}
            color="#666"
            anchorX="center"
            anchorY="middle"
          >
            CLICK FOR DETAILS
          </Text>
        </>
      ) : variant === "profile" ? (
        <>
  <Text
    position={[-2.3, 0.55, 0.08]}
    fontSize={0.26}
    color="#111"
    anchorX="left"
    anchorY="middle"
    maxWidth={2.5}
  >
    {poster.title}
  </Text>

  {poster.category && (
    <Text
      position={[-2.3, 0.2, 0.08]}
      fontSize={0.10}
      color="#666"
      anchorX="left"
      anchorY="middle"
    >
      {poster.category.toUpperCase()}
    </Text>
  )}

  {poster.tech && (
    <Text
      position={[-2.3, -0.05, 0.08]}
      fontSize={0.09}
      color="#555"
      anchorX="left"
      anchorY="middle"
      maxWidth={5}
      textAlign="left"
    >
      {poster.tech.join("  •  ")}
    </Text>
  )}

  {/* separator */}

  <mesh position={[0, -0.25, 0.05]}>
    <boxGeometry args={[5, 0.015, 0.02]} />
    <meshStandardMaterial color="#999" />
  </mesh>

  <Text
    position={[-2.3, -0.75, 0.08]}
    fontSize={0.11}
    color="#111"
    anchorX="left"
    anchorY="middle"
    maxWidth={4.8}
    textAlign="left"
    lineHeight={1.4}
  >
    {poster.description}
  </Text>

  <Text
    position={[2.1, -1.02, 0.08]}
    fontSize={0.08}
    color="#666"
    anchorX="center"
    anchorY="middle"
  >
    CLICK FOR DETAILS
  </Text>
</>
      ) : (<>
  <Text
    position={[-2.3, 0.55, 0.08]}
    fontSize={0.24}
    color="#111"
    anchorX="left"
    anchorY="middle"
  >
    {poster.title}
  </Text>

  <mesh position={[0, 0.25, 0.05]}>
    <boxGeometry args={[5, 0.015, 0.02]} />
    <meshStandardMaterial color="#999" />
  </mesh>

  {poster.tech && (
    <Text
      position={[-2.3, -0.15, 0.08]}
      fontSize={0.11}
      color="#222"
      anchorX="left"
      anchorY="middle"
      maxWidth={5}
      textAlign="left"
      lineHeight={1.7}
    >
      {poster.tech.join("\n")}
    </Text>
  )}

  <Text
    position={[2.1, -1.02, 0.08]}
    fontSize={0.08}
    color="#666"
    anchorX="center"
    anchorY="middle"
  >
    CLICK FOR DETAILS
  </Text>
</>
      )}
    </group>
  );
}

export default FloorCard;