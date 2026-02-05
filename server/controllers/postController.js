import prisma from "../config/prismaClient.js";
import cloudinary from "../config/cloudinary.js";

/* ================================
   CREATE POST (NO CHANGE)
================================ */

export const createPost = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { caption, category } = req.body;
    const userId = req.user.id;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    if (!caption && (!req.files || req.files.length === 0)) {
      return res.status(400).json({ message: "Post cannot be empty" });
    }

    const imageUrls = [];
    const imagePublicIds = [];

    if (Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "cybergram/posts" }
        );

        imageUrls.push(result.secure_url);
        imagePublicIds.push(result.public_id);
      }
    }

    const post = await prisma.post.create({
      data: {
        caption,
        category,
        images: imageUrls,
        imagePublicIds,
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
    res.status(500).json({ message: "Post creation failed" });
  }
};

/* ================================
   FETCH POSTS (NO CHANGE)
================================ */

export const getPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category } = req.query;

    const filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    const posts = await prisma.post.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
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

    const follows = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true }
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
    console.error("FEED ERROR:", error);
    res.status(500).json({ message: "Feed fetch failed" });
  }
};

/* ================================
   DELETE POST (FIXED ONLY)
================================ */

export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
  return res.json({
    success: true,
    message: "Already deleted"
  });
}


    if (post.userId !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 🔥 DELETE CLOUDINARY IMAGES
    if (Array.isArray(post.imagePublicIds)) {
      for (const publicId of post.imagePublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch {}
      }
    }

    // 🔥 CLEAN RELATED TABLES (VERY IMPORTANT)
    await prisma.$transaction([
      prisma.like.deleteMany({ where: { postId } }),
      prisma.comment.deleteMany({ where: { postId } }),
      prisma.save.deleteMany({ where: { postId } }),
      prisma.post.delete({ where: { id: postId } })
    ]);

    res.json({ success: true, postId });

  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

/* ================= SAVED POSTS (NO CHANGE)
================================ */

export const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const saved = await prisma.save.findMany({
      where: { userId },
      include: {
        post: {
          include: {
            user: {
              select: {
                username: true,
                avatar: true
              }
            },
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const posts = saved.map(item => item.post);
    res.json(posts);

  } catch (error) {
    console.log("SAVED ERROR:", error);
    res.status(500).json({ message: "Saved fetch failed" });
  }
};
