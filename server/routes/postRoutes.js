import express from "express";

import {
  createPost,
  getPosts,
  deletePost
} from "../controllers/postController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// FETCH POSTS
router.get("/", authMiddleware, getPosts);

// CREATE POST
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  createPost
);

// DELETE POST (IMPORTANT)
router.delete("/:id", authMiddleware, deletePost);

export default router;
