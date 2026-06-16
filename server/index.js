import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import codeforcesRoutes from "./routes/codeforces.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Backend Running");
});

app.use("/api/codeforces", codeforcesRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // temporary debug
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();