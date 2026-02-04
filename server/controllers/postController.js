import prisma from "../config/prismaclient.js";

/* ================================
   CREATE POST
================================ */

export const createPost = async (req, res) => {

  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { caption, category } = req.body;
    const userId = req.user.id;

    // Uploaded images
    const uploadedImages = req.files
      ? req.files.map(file => file.filename)
      : [];

    // Validation
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!caption && uploadedImages.length === 0) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const post = await prisma.post.create({

      data: {
        caption,
        category,
        images: uploadedImages,
        userId
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        likes: true,
        comments: true,
        saves: true
      }

    });

    res.status(201).json(post);

  } catch (error) {

    console.error("POST CREATE ERROR:", error);

    res.status(500).json({ message: error.message });

  }

};


/* ================================
   FETCH FEED POSTS (WITH CATEGORY)
================================ */

export const getPosts = async (req, res) => {

  try {

    const userId = req.user.id;

    const { category } = req.query;

    // ================= CATEGORY FILTER =================

    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    // ================= FETCH POSTS =================

    const posts = await prisma.post.findMany({

      where: filter,

      orderBy: {
        createdAt: "desc"
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        },
        likes: true,
        comments: true,
        saves: true
      }

    });

    // ================= FOLLOW STATUS =================

    const follows = await prisma.follow.findMany({
      where: {
        followerId: userId
      },
      select: {
        followingId: true
      }
    });

    const followingIds = follows.map(f => f.followingId);

    const updatedPosts = posts.map(post => ({
      ...post,
      user: {
        ...post.user,
        isFollowing: followingIds.includes(post.user.id)
      }
    }));

    res.json(updatedPosts);

  } catch (error) {

    console.log("FEED ERROR:", error);

    res.status(500).json({
      message: "Feed fetch failed"
    });

  }

};


/* ================================
   DELETE POST (OWNER ONLY)
================================ */

export const deletePost = async (req, res) => {

  try {

    const postId = Number(req.params.id);
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this post"
      });
    }

    await prisma.post.delete({
      where: { id: postId }
    });

    res.json({
      success: true,
      message: "Post deleted successfully"
    });

  } catch (error) {

    console.error("DELETE POST ERROR:", error);

    res.status(500).json({
      message: "Failed to delete post"
    });

  }

};
