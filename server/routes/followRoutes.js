import express from "express";
import { toggleFollow } from "../controllers/followController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Toggle follow / unfollow
router.post("/:username", verifyToken, toggleFollow);

export default router;
