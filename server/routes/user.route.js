import express from "express";
import { deleteUser, getUser, upgradeToSeller } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.delete('/:id', verifyToken,deleteUser)
router.get('/:id', verifyToken, getUser)
router.patch('/:id', verifyToken, upgradeToSeller);
export default router;