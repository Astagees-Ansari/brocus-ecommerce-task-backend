import express from "express";
import { purchase } from "./order.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, purchase);

export default router;
