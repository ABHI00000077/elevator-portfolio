import { motion } from "framer-motion";
import { useState } from "react";
import type { FloorPoster } from "../../data/floorContent";

type Props = {
  poster: FloorPoster;
  floorNumber: number;
  onClose: () => void;
};

type Theme = {
  label: string;
  accent: string;
  accentSoft: string;
  border: string;
};
const FLOOR_SECTION_LABELS: Record<
  number,
  {
    category: string;
    tech: string;
    description: string;
  }
> = {
  0: {
    category: "PROFILE",
    tech: "OVERVIEW",
    description: "ABOUT ME",
  },

  1: {
    category: "DOMAIN",
    tech: "SKILLS BUILT",
    description: "DETAILS",
  },

  2: {
    category: "CATEGORY",
    tech: "TOOLS USED",
    description: "PROJECT OVERVIEW",
  },

  3: {
    category: "ROLE",
    tech: "SKILLS DEVELOPED",
    description: "EXPERIENCE SUMMARY",
  },

  4: {
    category: "SECTION",
  tech: "KEY ELEMENTS",
  description: "BEHIND THE BUILD",
  },

  5: {
    category: "CONTACT TYPE",
    tech: "CONTACT CHANNELS",
    description: "INFORMATION",
  },
};
const FLOOR_THEMES: Record<number, Theme> = {
  0: {
    label: "PERSONNEL DOSSIER",
    accent: "#3f82ff",
    accentSoft: "rgba(63,130,255,0.10)",
    border: "#b8cfff",
  },
  1: {
    label: "TECHNICAL SPECIFICATION",
    accent: "#ff9f1c",
    accentSoft: "rgba(255,159,28,0.10)",
    border: "#f3c78a",
  },
  2: {
    label: "PROJECT DOSSIER",
    accent: "#f3c623",
    accentSoft: "rgba(243,198,35,0.12)",
    border: "#d1b85a",
  },
  3: {
    label: "SITE LOGBOOK",
    accent: "#2ec4b6",
    accentSoft: "rgba(46,196,182,0.10)",
    border: "#9fe7df",
  },
  4: {
    label: "ACHIEVEMENT RECORD",
    accent: "#00c853",
    accentSoft: "rgba(0,200,83,0.10)",
    border: "#8fe8b5",
  },
  5: {
    label: "CONTACT DIRECTORY",
    accent: "#e91e63",
    accentSoft: "rgba(233,30,99,0.10)",
    border: "#f39ab8",
  },
};

function ActionButton({
  children,
  onClick,
  accent,
}: {
  children: string;
  onClick: () => void;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "12px 18px",
        border: `2px solid ${accent}`,
        background: hovered ? accent : "rgba(255,255,255,0.75)",
        color: hovered ? "#111" : "#222",
        cursor: "pointer",
        fontWeight: 800,
        letterSpacing: "0.04em",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      {children}
    </button>
  );
}

function BlueprintModal({
  poster,
  floorNumber,
  onClose,
}: Props) {
  const theme = FLOOR_THEMES[floorNumber] ?? FLOOR_THEMES[2];
  const labels =
  FLOOR_SECTION_LABELS[
    floorNumber
  ];
  const openLink = (url?: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasCategory = Boolean(poster.category);
  const hasTech = Boolean(poster.tech && poster.tech.length > 0);
  const hasButtons = Boolean(poster.github || poster.demo);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.22)",
        backdropFilter: "blur(3px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: "72%",
          height: "78%",
          borderRadius: "20px",
          border: `2px solid ${theme.border}`,
          overflow: "hidden",
          position: "relative",
          background: "#f4efe3",
          color: "#222",
          boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
        }}
      >
        {/* Grid */}
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

        {/* Big stamp */}
        <div
          style={{
            position: "absolute",
            top: "120px",
            right: "-40px",
            transform: "rotate(-18deg)",
            fontSize: "80px",
            fontWeight: 900,
            color: "rgba(0,180,100,0.10)",
            border: "6px solid rgba(0,180,100,0.10)",
            padding: "12px 40px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          APPROVED
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            border: "none",
            background: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#222",
            zIndex: 5,
            padding: 0,
            lineHeight: 1,
          }}
          aria-label="Close modal"
        >
          ✕ CLOSE
        </button>

        <div
          style={{
            padding: "30px",
            position: "relative",
            zIndex: 2,
            height: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "22px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                background: theme.accent,
                padding: "6px 12px",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "2px",
                color: "#111",
              }}
            >
              {theme.label}
            </div>

            {poster.id && (
              <div
                style={{
                  border: `1px solid ${theme.border}`,
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  background: "rgba(255,255,255,0.45)",
                }}
              >
                {poster.id}
              </div>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "38% 62%",
              gap: "30px",
              height: "calc(100% - 70px)",
            }}
          >
            {/* Left panel */}
            <div>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: "12px",
                  letterSpacing: "2px",
                  color: theme.accent,
                }}
              >
                {poster.id ? "PROJECT PREVIEW" : "INFORMATION PANEL"}
              </h3>

              <div
                style={{
                  height: "320px",
                  border: `2px solid ${theme.border}`,
                  borderRadius: "16px",
                  background: poster.id
                    ? theme.accentSoft
                    : "rgba(255,255,255,0.45)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {poster.image ? (
                  <img
                    src={poster.image}
                    alt={poster.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      color: "#666",
                      textAlign: "center",
                      padding: "20px",
                      fontSize: "16px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {poster.id ? "PREVIEW COMING SOON" : "INFORMATION BOARD"}
                  </div>
                )}
              </div>
            </div>

            {/* Right panel */}
            <div
              style={{
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <h1
                style={{
                  marginTop: 0,
                  marginBottom: "18px",
                  fontSize: "42px",
                  lineHeight: 1.05,
                }}
              >
                {poster.title}
              </h1>

              {hasCategory && (
                <>
                  <h3
                    style={{
                      marginBottom: "8px",
                      color: theme.accent,
                      letterSpacing: "2px",
                      fontSize: "14px",
                    }}
                  >
                    {labels.category}
                  </h3>
                  <p style={{ marginTop: 0, marginBottom: "18px", fontSize: "18px" }}>
                    {poster.category}
                  </p>
                </>
              )}

              {hasTech && (
                <>
                  <h3
                    style={{
                      marginBottom: "10px",
                      color: theme.accent,
                      letterSpacing: "2px",
                      fontSize: "14px",
                    }}
                  >
                    {labels.tech}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginBottom: "18px",
                    }}
                  >
                    {poster.tech!.map((item) => (
                      <span
                        key={item}
                        style={{
                          border: `1px solid ${theme.border}`,
                          padding: "6px 12px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.5)",
                          fontSize: "14px",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <h3
                style={{
                  marginBottom: "8px",
                  color: theme.accent,
                  letterSpacing: "2px",
                  fontSize: "14px",
                }}
              >
                {labels.description}
              </h3>

              <p
                style={{
                  lineHeight: 1.8,
                  fontSize: "18px",
                  marginTop: 0,
                  marginBottom: "24px",
                  color: "#222",
                }}
              >
                {poster.description}
              </p>

              {hasButtons && (
                <div
                  style={{
                    display: "flex",
                    gap: "14px",
                    flexWrap: "wrap",
                    marginTop: "8px",
                  }}
                >
                  {poster.github && (
                    <ActionButton
                      accent={theme.accent}
                      onClick={() => openLink(poster.github)}
                    >
                      VIEW SOURCE
                    </ActionButton>
                  )}

                  {poster.demo && (
                    <ActionButton
                      accent={theme.accent}
                      onClick={() => openLink(poster.demo)}
                    >
                      LIVE DEMO
                    </ActionButton>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BlueprintModal;