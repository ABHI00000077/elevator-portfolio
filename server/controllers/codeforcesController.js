import axios from "axios";
import CodeforcesRating from "../models/CodeforcesRating.js";

export async function getCodeforcesData(req, res) {
  try {
    const handle = req.params.handle?.trim();

    if (!handle) {
      return res.status(400).json({ message: "Handle is required." });
    }

    const cached = await CodeforcesRating.findOne({ handle }).lean();

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;
    if (cached?.updatedAt) {
      const ageMs = Date.now() - new Date(cached.updatedAt).getTime();

      if (ageMs < ONE_DAY_MS && cached.contests?.length) {
        return res.json({
          handle: cached.handle,
          contests: cached.contests,
          currentRating: cached.currentRating,
          peakRatingOverall: cached.peakRatingOverall,
          totalContestsOverall: cached.totalContestsOverall,
          source: "cache",
        });
      }
    }

    const response = await axios.get("https://codeforces.com/api/user.rating", {
      params: { handle },
      timeout: 10000,
    });

    if (response.data.status !== "OK") {
      return res.status(502).json({
        message: response.data.comment || "Codeforces API error",
      });
    }

    const allContests = response.data.result || [];

    const contests = allContests.slice(-20).map((contest) => ({
      contestId: contest.contestId,
      contestName: contest.contestName,
      oldRating: contest.oldRating,
      newRating: contest.newRating,
      delta: contest.newRating - contest.oldRating,
      ratingUpdateTimeSeconds: contest.ratingUpdateTimeSeconds,
    }));

    const currentRating =
      allContests.length > 0
        ? allContests[allContests.length - 1].newRating
        : 0;

    const peakRatingOverall = allContests.length
      ? Math.max(...allContests.map((c) => c.newRating))
      : 0;

    const totalContestsOverall = allContests.length;

    const saved = await CodeforcesRating.findOneAndUpdate(
      { handle },
      {
        handle,
        contests,
        currentRating,
        peakRatingOverall,
        totalContestsOverall,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    ).lean();

    return res.json({
      handle: saved.handle,
      contests: saved.contests,
      currentRating: saved.currentRating,
      peakRatingOverall: saved.peakRatingOverall,
      totalContestsOverall: saved.totalContestsOverall,
      source: "api",
    });
  } catch (error) {
    console.error("Codeforces fetch failed:", error);
    return res.status(500).json({
      message: "Failed to fetch Codeforces data",
      error: error.message,
    });
  }
}