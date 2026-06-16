import { Router } from "express";
import {
  getCodeforcesData,
} from "../controllers/codeforcesController.js";

const router = Router();

router.get(
  "/:handle",
  getCodeforcesData
);

export default router;