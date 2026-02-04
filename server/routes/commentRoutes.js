import express from "express";
import {
  getComments,
  addComment,
  deleteComment
} from "../controllers/commentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:postId", authMiddleware, getComments);

router.post("/:postId", authMiddleware, addComment);

router.delete("/:id", authMiddleware, deleteComment);

export default router;
