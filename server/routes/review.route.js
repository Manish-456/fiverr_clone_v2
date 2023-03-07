import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, createReview);
router.get("/:id",  getReview);
router.post("/:id", verifyToken, deleteReview);

export default router;
