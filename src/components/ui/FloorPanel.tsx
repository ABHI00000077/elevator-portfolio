type Props = {
  currentFloor: number;
  onFloorSelect: (floor: number) => void;
  disabled?: boolean;
};

const floors = [
  { id: 5, label: "5" },
  { id: 4, label: "4" },
  { id: 3, label: "3" },
  { id: 2, label: "2" },
  { id: 1, label: "1" },
  { id: 0, label: "G" },
];

function FloorPanel({
  currentFloor,
  onFloorSelect,
  disabled = false,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        left: "30px",
        bottom: "30px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: disabled ? "none" : "auto",
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {floors.map((floor) => (
        <button
          key={floor.id}
          onClick={() => onFloorSelect(floor.id)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "10px",
            border: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            background:
              currentFloor === floor.id ? "#00ffff" : "#222",
            color:
              currentFloor === floor.id ? "#000" : "#fff",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          {floor.label}
        </button>
      ))}
    </div>
  );
}

export default FloorPanel;