import express from "express";
import {  confirmPayment, getOrders, intent } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();



router.get("/", verifyToken, getOrders);

router.post('/create-payment-intent/:gigId', verifyToken, intent);

router.put('/', verifyToken, confirmPayment)

export default router;
