import express from "express";
import { getCyberNews } from "../controllers/newsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/cyber", authMiddleware, getCyberNews);

export default router;
