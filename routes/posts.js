import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.js";

// @desc Get all posts
router.get("/", getPosts);

// @desc Get single post
router.get("/:id", getPost);

// @desc Create new post
router.post("/", createPost);

// @desc Update post
router.put("/:id", updatePost);

// @desc Delete post
router.delete("/:id", deletePost);

export default router;
