import { useProgress } from "@react-three/drei";

function LoadingOverlay() {
  const { active, progress, item } = useProgress();

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99998,
        background:
          "linear-gradient(135deg, #f4efe3, #ddd3bc)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "min(560px, 84vw)",
          border: "2px solid #d1b85a",
          borderRadius: "20px",
          background: "#f4efe3",
          padding: "28px",
          boxShadow: "0 20px 80px rgba(0,0,0,0.18)",
          textAlign: "center",
          color: "#222",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "#f3c623",
            padding: "6px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "2px",
            marginBottom: "18px",
          }}
        >
          LOADING CONSTRUCTION SITE
        </div>

        <h1 style={{ margin: 0, fontSize: "34px" }}>
          Building your experience
        </h1>

        <p style={{ marginTop: "12px", marginBottom: "22px", lineHeight: 1.7 }}>
          {item || "Preparing assets..."}
        </p>

        <div
          style={{
            width: "100%",
            height: "14px",
            background: "rgba(0,0,0,0.08)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#f3c623",
              transition: "width 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginTop: "14px", fontWeight: 700 }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
}

export default LoadingOverlay;