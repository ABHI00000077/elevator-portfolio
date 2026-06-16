import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useSoundEffects } from "./hooks/useSoundEffects";
import LoadingOverlay from "./components/ui/LoadingOverlay";
import ElevatorScene from "./scenes/ElevatorScene";
import FloorPanel from "./components/ui/FloorPanel";
import BlueprintModal from "./components/ui/BlueprintModal";
import { floors } from "./data/floor";
import { floorContent, type FloorPoster } from "./data/floorContent";
import type { ElevatorState } from "./hooks/useElevator";
import CodeforcesModal
from "./components/ui/CodeforcesModal";
function BeginTourButton({
  onClick,
}: {
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 20px",
        borderRadius: "12px",
        border: "2px solid #d1b85a",
        background: hovered ? "#f3c623" : "#efe6cf",
        color: "#222",
        fontWeight: 800,
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.14)" : "none",
      }}
    >
      BEGIN TOUR
    </button>
  );
}

function App() {
  const [showCodeforces, setShowCodeforces] =
  useState(false);
  const {startBackgroundMusic,playDoorClose,playLiftHum,stopLiftHum,playPosterClick,playModalClose,playDing,} = useSoundEffects();
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(0);
  const [state, setState] = useState<ElevatorState>("idle");
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<FloorPoster | null>(null);
  const [showWelcomeBoard, setShowWelcomeBoard] = useState(true);

  const elevatorYRef = useRef(0);
  const timerIds = useRef<number[]>([]);
  const clearTimers = () => {
    timerIds.current.forEach((id) => window.clearTimeout(id));
    timerIds.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const handleBeginTour = () => {
    setShowWelcomeBoard(false);
    setSelectedPoster(null);
    setCurrentFloor(0);
    setTargetFloor(0);
    setState("idle");
    setDoorsClosed(false);
    setIsTransitioning(false);
    startBackgroundMusic();
  };

  const handleFloorSelect = (floor: number) => {
    if (floor === currentFloor) return;
    if (isTransitioning) return;

    clearTimers();

    const floorDifference = Math.abs(floor - currentFloor);
    const moveDuration = floorDifference * 1000;

    setIsTransitioning(true);
    setTargetFloor(floor);
    setDoorsClosed(false);
    setState("zoomingIn");
    setSelectedPoster(null);
    setShowWelcomeBoard(false);

    timerIds.current.push(
      window.setTimeout(() => {
        setState("closingDoors");
        setDoorsClosed(true);
        playDoorClose()
      }, 1000)
    );

    timerIds.current.push(
      window.setTimeout(() => {
        setState("moving");
        playLiftHum()
      }, 2200)
    );

    timerIds.current.push(
      window.setTimeout(() => {
        setCurrentFloor(floor);
        setState("openingDoors");
        setDoorsClosed(false);
        stopLiftHum()
        playDing()
      }, 3000 + moveDuration)
    );

    timerIds.current.push(
      window.setTimeout(() => {
        setState("zoomingOut");
      }, 3200 + moveDuration)
    );

    timerIds.current.push(
      window.setTimeout(() => {
        setState("idle");
        setIsTransitioning(false);
        clearTimers();
      }, 4500 + moveDuration)
    );
  };

  return (
    <>
      {showWelcomeBoard && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(2px)",
          }}
        >
          <div
            style={{
              width: "min(720px, 86vw)",
              borderRadius: "20px",
              border: "2px solid #d1b85a",
              background: "#f4efe3",
              color: "#222",
              boxShadow: "0 20px 80px rgba(0,0,0,0.22)",
              position: "relative",
              overflow: "hidden",
              padding: "34px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                pointerEvents: "none",
                opacity: 0.5,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "inline-block",
                  background: "#f3c623",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  marginBottom: "18px",
                }}
              >
                WELCOME BOARD
              </div>

              <h1
                style={{
                  marginTop: 0,
                  marginBottom: "14px",
                  fontSize: "42px",
                  lineHeight: 1.05,
                }}
              >
                Step into the elevator and explore the portfolio.
              </h1>

              <p
                style={{
                  marginTop: 0,
                  marginBottom: "26px",
                  lineHeight: 1.8,
                  fontSize: "18px",
                  maxWidth: "580px",
                }}
              >
                Use the floor panel to move through the construction site. Each stop reveals a different part of the portfolio, and each poster opens a detailed blueprint view.
              </p>

              <BeginTourButton onClick={handleBeginTour} />
            </div>
          </div>
        </div>
      )}
      {
  showCodeforces && (
    <CodeforcesModal
      handle="ABHI070707"
      onClose={() =>
        setShowCodeforces(false)
      }
    />
  )
}
      {selectedPoster && (
        <BlueprintModal
          poster={selectedPoster}
          floorNumber={currentFloor}
          onClose={() =>{ playModalClose();setSelectedPoster(null);}}
        />
      )}

      <FloorPanel
        currentFloor={currentFloor}
        onFloorSelect={handleFloorSelect}
        disabled={isTransitioning}
      />

      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "#050505",
        }}
      ><LoadingOverlay />
        <Canvas
          shadows
          camera={{
            position: [1.2, 0, 15],
            fov: 45,
          }}
        ><Suspense fallback={null}>
          <ElevatorScene
            state={state}
            currentFloor={currentFloor}
            targetFloor={targetFloor}
            doorsClosed={doorsClosed}
            elevatorYRef={elevatorYRef}
            onPosterSelect={(poster) => {
  if (poster.type === "codeforces") {
    setShowCodeforces(true);
    return;
  }

  setSelectedPoster(poster);
}}
            playPosterClick={playPosterClick}
            
          />
           </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default App;