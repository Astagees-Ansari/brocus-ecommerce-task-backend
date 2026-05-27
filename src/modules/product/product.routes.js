import express from "express";
import { getProducts, createProduct } from "./product.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, createProduct);

export default router;
