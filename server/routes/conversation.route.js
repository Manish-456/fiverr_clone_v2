import express from "express";
import {
  createConversation,
  getConversation,
  getConversations,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;
