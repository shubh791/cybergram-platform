import prisma from "../config/prismaClient.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

/* ================= GET PROFILE INFO ================= */

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUserId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        bio: true,
        avatar: true,
        avatarPublicId: true,
        _count: {
          select: {
            posts: true,
            followers: true,
            following: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let isFollowing = false;

    if (currentUserId) {
      const follow = await prisma.follow.findFirst({
        where: {
          followerId: currentUserId,
          followingId: user.id
        }
      });
      isFollowing = !!follow;
    }

    res.json({
      id: user.id,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      isFollowing,
      _count: {
        posts: user._count.posts,
        followers: user._count.followers,
        following: user._count.following
      }
    });

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};

/* ================= GET USER POSTS ================= */

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const posts = await prisma.post.findMany({
      where: { user: { username } },
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        },
        likes: true,
        comments: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(posts);

  } catch (error) {
    console.log("POST ERROR:", error);
    res.status(500).json({ message: "Posts fetch failed" });
  }
};

/* ================= GET SAVED POSTS ================= */

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

/* ================= UPDATE BIO ================= */

export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { bio }
    });

    res.json(updated);

  } catch (error) {
    console.log("BIO ERROR:", error);
    res.status(500).json({ message: "Bio update failed" });
  }
};

/* ================= UPDATE AVATAR ================= */

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    // Safe delete old avatar
    if (user?.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      } catch {
        console.log("Old avatar delete skipped");
      }
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "cybergram/avatars",
        transformation: [{ width: 300, height: 300, crop: "fill" }]
      }
    );

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        avatar: uploadResult.secure_url,
        avatarPublicId: uploadResult.public_id
      }
    });

    res.json({ avatar: updated.avatar });

  } catch (error) {
    console.log("AVATAR ERROR:", error);
    res.status(500).json({ message: "Avatar update failed" });
  }
};

/* ================= DELETE ACCOUNT ================= */

export const deleteMyAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (user.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      } catch {}
    }

    await prisma.$transaction([
      prisma.notification.deleteMany({ where: { OR: [{ senderId: userId }, { receiverId: userId }] } }),
      prisma.message.deleteMany({ where: { OR: [{ senderId: userId }, { receiverId: userId }] } }),
      prisma.like.deleteMany({ where: { userId } }),
      prisma.comment.deleteMany({ where: { userId } }),
      prisma.follow.deleteMany({ where: { OR: [{ followerId: userId }, { followingId: userId }] } }),
      prisma.save.deleteMany({ where: { userId } }),
      prisma.post.deleteMany({ where: { userId } }),
      prisma.user.delete({ where: { id: userId } })
    ]);

    res.json({ success: true });

  } catch (error) {
    console.log("DELETE ACCOUNT ERROR:", error);
    res.status(500).json({ message: "Account deletion failed" });
  }
};
