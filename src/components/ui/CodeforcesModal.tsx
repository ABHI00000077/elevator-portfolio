import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ContestPoint = {
  contestId: number;
  contestName: string;
  oldRating: number;
  newRating: number;
  delta: number;
  ratingUpdateTimeSeconds: number;
};

type ApiResponse = {
  handle: string;
  contests: ContestPoint[];
  currentRating: number;
  peakRatingOverall: number;
  totalContestsOverall: number;
  source?: "api" | "cache";
};

type Props = {
  handle: string;
  onClose: () => void;
};

function getRatingColor(rating: number) {
  if (rating >= 2600) return "#ff3333";
  if (rating >= 2400) return "#ff8800";
  if (rating >= 2100) return "#b000b5";
  if (rating >= 1900) return "#0000ff";
  if (rating >= 1600) return "#03a603";
  return "#777";
}

function formatDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleDateString();
}

function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div
      style={{
        padding: "18px",
        background: "rgba(255,255,255,0.72)",
        border: "1px solid #d1b85a",
        borderRadius: "14px",
        minHeight: "92px",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          opacity: 0.7,
          marginBottom: "8px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "30px",
          fontWeight: 800,
          color: color || "#222",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}
const API_URL = import.meta.env.VITE_API_URL;
function CodeforcesModal({ handle, onClose }: Props) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
  `${API_URL}/api/codeforces/${handle}`
);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [handle]);

  const chartData = useMemo(() => {
    if (!data?.contests) return [];
    return data.contests.map((contest, index) => ({
      idx: index + 1,
      contestName: contest.contestName,
      rating: contest.newRating,
      delta: contest.delta,
      date: formatDate(contest.ratingUpdateTimeSeconds),
    }));
  }, [data]);

  const currentRating = data?.currentRating ?? 0;
const peakRatingOverall = data?.peakRatingOverall ?? 0;
const totalContestsOverall =
  data?.totalContestsOverall ?? 0;
  const latestContest = data?.contests?.[data.contests.length - 1];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.28)",
        backdropFilter: "blur(4px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        style={{
          width: "78%",
          height: "80%",
          borderRadius: "20px",
          border: "2px solid #d1b85a",
          background: "#f4efe3",
          boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
          overflow: "auto",
          position: "relative",
          color: "#222",
        }}
      >
        {/* blueprint grid */}
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
            opacity: 0.45,
          }}
        />

        {/* large faint stamp */}
        <div
          style={{
            position: "absolute",
            top: "130px",
            right: "-50px",
            transform: "rotate(-18deg)",
            fontSize: "78px",
            fontWeight: 900,
            color: "rgba(0,180,100,0.10)",
            border: "6px solid rgba(0,180,100,0.10)",
            padding: "12px 38px",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          APPROVED
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 20,
            zIndex: 4,
            border: "none",
            background: "none",
            color: "#222",
            fontSize: "28px",
            cursor: "pointer",
            lineHeight: 1,
            fontWeight: 700,
          }}
          aria-label="Close modal"
        >
          ✕ CLOSE
        </button>

        <div
          style={{
            padding: "28px 30px",
            position: "relative",
            zIndex: 2,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#f3c623",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#111",
              marginBottom: "14px",
            }}
          >
            COMPETITIVE PROGRAMMING
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "18px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                border: "1px solid #999",
                padding: "6px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                background: "rgba(255,255,255,0.5)",
              }}
            >
              HANDLE: {handle}
            </div>

            {data?.source && (
              <div
                style={{
                  border: "1px solid #999",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  background: "rgba(255,255,255,0.5)",
                }}
              >
                SOURCE: {"CODEFORCES"}
              </div>
            )}
          </div>

          <h1
            style={{
              fontFamily: "Rajdhani",
              margin: "0 0 20px 0",
              fontSize: "40px",
              lineHeight: 1.05,
            }}
          >
            Codeforces Analytics
          </h1>

          {loading ? (
            <div
              style={{
                padding: "40px 0",
                fontSize: "18px",
              }}
            >
              Loading rating history...
            </div>
          ) : !data ? (
            <div style={{ padding: "40px 0" }}>
              Could not load Codeforces data.
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <StatCard
  title="Current Rating"
  value={currentRating}
  color={getRatingColor(currentRating)}
/>

<StatCard
  title="Peak Rating"
  value={peakRatingOverall}
  color={getRatingColor(peakRatingOverall)}
/>

<StatCard
  title="Total Contests"
  value={totalContestsOverall}
/>
            </div>
          )}

          {!loading && data && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "58% 42%",
                gap: "18px",
                height: "calc(100% - 220px)",
              }}
            >
              <div
                style={{
                  minHeight: 0,
                  background: "rgba(255,255,255,0.45)",
                  border: "1px solid #d1b85a",
                  borderRadius: "14px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    marginBottom: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#444",
                  }}
                >
                  Rating Graph
                </div>

                <div style={{ width: "100%", height: "calc(100% - 28px)" }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="idx"
                        tick={{ fontSize: 12 }}
                        label={{ value: "Contest Order", position: "insideBottom", offset: -2 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
  formatter={(value: any) => [
    String(value),
    "Rating",
  ]}
  labelFormatter={(label) =>
    `Contest #${label}`
  }
/>
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="#f3c623"
                        strokeWidth={4}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                style={{
                  minHeight: 0,
                  overflowY: "auto",
                  background: "rgba(255,255,255,0.45)",
                  border: "1px solid #d1b85a",
                  borderRadius: "14px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    marginBottom: "10px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#444",
                  }}
                >
                  Contest History
                </div>

                <div style={{ display: "grid", gap: "10px" }}>
                  {data.contests
                    .slice()
                    .reverse()
                    .map((contest) => (
                      <div
                        key={contest.contestId}
                        style={{
                          background: "rgba(255,255,255,0.65)",
                          border: "1px solid rgba(0,0,0,0.08)",
                          borderRadius: "12px",
                          padding: "12px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 800,
                            marginBottom: "6px",
                            fontSize: "14px",
                          }}
                        >
                          {contest.contestName}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                            marginBottom: "4px",
                          }}
                        >
                          <span>Old: {contest.oldRating}</span>
                          <span>New: {contest.newRating}</span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "13px",
                          }}
                        >
                          <span>{formatDate(contest.ratingUpdateTimeSeconds)}</span>
                          <span
                            style={{
                              fontWeight: 800,
                              color: contest.delta >= 0 ? "#0a9f4d" : "#d83b3b",
                            }}
                          >
                            {contest.delta >= 0 ? "+" : ""}
                            {contest.delta}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                {latestContest && (
                  <div
                    style={{
                      marginTop: "14px",
                      padding: "12px",
                      borderRadius: "12px",
                      background: "rgba(243,198,35,0.14)",
                      border: "1px solid rgba(243,198,35,0.5)",
                      fontSize: "13px",
                    }}
                  >
                    Latest contest:{" "}
                    <strong>{latestContest.contestName}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default CodeforcesModal;