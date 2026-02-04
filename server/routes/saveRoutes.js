import express from "express";
import { toggleSave } from "../controllers/saveController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Toggle save / unsave
router.post("/:postId", verifyToken, toggleSave);

export default router;
