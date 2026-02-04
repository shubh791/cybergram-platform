import prisma from "../config/prismaclient.js";
import bcrypt from "bcryptjs";

// ================= GET PROFILE INFO =================

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

    // FOLLOW STATUS
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

    // ✅ FIXED COUNTS (SWAPPED)
    res.json({

      id: user.id,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
      isFollowing,

      _count: {
        posts: user._count.posts,

        // IMPORTANT SWAP 👇
        followers: user._count.following,
        following: user._count.followers
      }

    });

  } catch (error) {

    console.log("PROFILE ERROR:", error);
    res.status(500).json({ message: "Profile fetch failed" });

  }

};

// ================= GET USER POSTS =================

export const getUserPosts = async (req, res) => {

  try {

    const { username } = req.params;

    const posts = await prisma.post.findMany({
      where: {
        user: { username }
      },
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
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(posts);

  } catch (error) {

    console.log("POST ERROR:", error);
    res.status(500).json({ message: "Posts fetch failed" });

  }
};


// ================= GET SAVED POSTS =================

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
      orderBy: {
        createdAt: "desc"
      }
    });

    const posts = saved.map(item => item.post);

    res.json(posts);

  } catch (error) {

    console.log("SAVED ERROR:", error);
    res.status(500).json({ message: "Saved fetch failed" });

  }
};


// ================= UPDATE BIO =================

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


// ================= UPDATE AVATAR =================

export const updateAvatar = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarFileName = req.file.filename;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        avatar: avatarFileName
      }
    });

    res.json({
      avatar: updated.avatar
    });

  } catch (error) {

    console.log("AVATAR ERROR:", error);
    res.status(500).json({ message: "Avatar update failed" });

  }
};


// ================= DELETE MY ACCOUNT (SECURE + FK SAFE) =================

export const deleteMyAccount = async (req, res) => {

  try {

    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    // ================= TRANSACTION SAFE DELETE =================

    await prisma.$transaction([

      // Notifications cleanup
      prisma.notification.deleteMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      }),

      // Messages cleanup
      prisma.message.deleteMany({
        where: {
          OR: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      }),

      // Existing deletes (keeping your logic)
      prisma.like.deleteMany({ where: { userId } }),

      prisma.comment.deleteMany({ where: { userId } }),

      prisma.follow.deleteMany({
        where: {
          OR: [
            { followerId: userId },
            { followingId: userId }
          ]
        }
      }),

      prisma.save.deleteMany({ where: { userId } }),

      prisma.post.deleteMany({ where: { userId } }),

      // Final user delete
      prisma.user.delete({
        where: { id: userId }
      })

    ]);

    res.json({
      success: true,
      message: "Account deleted permanently"
    });

  } catch (error) {

    console.log("DELETE ACCOUNT ERROR:", error);

    res.status(500).json({
      message: "Account deletion failed"
    });

  }

};
