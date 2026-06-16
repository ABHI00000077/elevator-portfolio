import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema(
  {
    contestId: Number,
    contestName: String,
    oldRating: Number,
    newRating: Number,
    delta: Number,
    ratingUpdateTimeSeconds: Number,
  },
  { _id: false }
);

const CodeforcesRatingSchema = new mongoose.Schema({
  handle: { type: String, required: true, unique: true, index: true },
  contests: [ContestSchema],
  currentRating: { type: Number, default: 0 },
  peakRatingOverall: { type: Number, default: 0 },
  totalContestsOverall: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("CodeforcesRating", CodeforcesRatingSchema);