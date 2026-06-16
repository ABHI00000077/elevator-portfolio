import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

import FloorCard from "./FloorCard";
import { floorContent, type FloorPoster } from "../../data/floorContent";

type Props = {
  currentFloor: number;
  elevatorYRef: MutableRefObject<number>;
  isVisible: boolean;
  onPosterSelect: (poster: FloorPoster) => void;
  playPosterClick: () => void;
};

const FLOOR_ACCENTS: Record<number, string> = {
  0: "#3f82ff",
  1: "#ff9f1c",
  2: "#f3c623",
  3: "#2ec4b6",
  4: "#00c853",
  5: "#e91e63",
};

function CardWall({
  currentFloor,
  elevatorYRef,
  isVisible,
  onPosterSelect,
  playPosterClick
}: Props) {
  const wallRef = useRef<THREE.Group>(null!);
  const [appear, setAppear] = useState(false);

  const data = floorContent[currentFloor];
  const accent = FLOOR_ACCENTS[currentFloor] ?? "#f3c623";

  useEffect(() => {
    setAppear(false);
    const id = window.setTimeout(() => {
      setAppear(true);
    }, 250);

    return () => window.clearTimeout(id);
  }, [currentFloor]);

  useFrame(() => {
    if (!wallRef.current) return;

    const targetY = elevatorYRef.current;
    wallRef.current.position.y += (targetY - wallRef.current.position.y) * 0.08;

    const targetScale =
      isVisible && appear
        ? data.layout === "profile" || data.layout === "contact"
          ? 1.18
          : 1.12
        : 0.7;

    wallRef.current.scale.x += (targetScale - wallRef.current.scale.x) * 0.08;
    wallRef.current.scale.y += (targetScale - wallRef.current.scale.y) * 0.08;
  });

  return (
    <group ref={wallRef} position={[4, 10, 3]} scale={[0.7, 0.7, 1]}>

      {data.layout === "profile" && (
        <FloorCard
          poster={data.posters[0]}
          position={[0, 0.15, 0]}
          onClick={() => {playPosterClick();onPosterSelect(data.posters[0])}}
          variant="profile"
          accent={accent}
          headerText="PERSONAL PROFILE"
        />
      )}

      {data.layout === "contact" && (
        <FloorCard
          poster={data.posters[0]}
          position={[0, 0.15, 0]}
          onClick={() => {playPosterClick();onPosterSelect(data.posters[0])}}
          variant="contact"
          accent={accent}
          headerText="CONTACT DIRECTORY"
        />
      )}

      {data.layout === "grid" && (
        <>
          <FloorCard
            poster={data.posters[0]}
            position={[-1.35, 1.75, 0]}
            onClick={() => {playPosterClick();onPosterSelect(data.posters[0])}}
            accent={accent}
          />

          <FloorCard
            poster={data.posters[1]}
            position={[1.35, 1.75, 0]}
            onClick={() => {playPosterClick();onPosterSelect(data.posters[1])}}
            accent={accent}
          />

          <FloorCard
            poster={data.posters[2]}
            position={[-1.35, -0.75, 0]}
            onClick={() => {playPosterClick();onPosterSelect(data.posters[2])}}
            accent={accent}
          />

          <FloorCard
            poster={data.posters[3]}
            position={[1.35, -0.75, 0]}
            onClick={() => {playPosterClick();onPosterSelect(data.posters[3])}}
            accent={accent}
          />
        </>
      )}
    </group>
  );
}

export default CardWall;