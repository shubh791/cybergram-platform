import prisma from "../config/prismaClient.js";

/* ===============================
   TOGGLE LIKE
================================ */

export const toggleLike = async (req, res) => {

  const userId = Number(req.user.id);
  const postId = Number(req.params.postId);

  try {

    const io = req.app.get("io");

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    /* ================= UNLIKE ================= */

    if (existingLike) {

      await prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });

      return res.json({
        liked: false
      });
    }

    /* ================= LIKE ================= */

    await prisma.like.create({
      data: {
        userId,
        postId
      }
    });

    /* ================= GET POST OWNER ================= */

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true }
    });

    // SAFETY CHECK
    if (!post) {
      return res.json({ liked: true });
    }

    const postOwnerId = Number(post.userId);

    /* ================= BLOCK SELF NOTIFICATION ================= */

    if (postOwnerId === userId) {
      return res.json({ liked: true });
    }

    /* ================= GET LIKER ================= */

    const liker = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true }
    });

    if (!liker || !io) {
      return res.json({ liked: true });
    }

    /* ================= SAVE NOTIFICATION (NEW) ================= */

    await prisma.notification.create({
      data: {
        type: "like",
        message: `@${liker.username} liked your post`,
        senderId: userId,
        receiverId: postOwnerId,
        postId: postId
      }
    });

    /* ================= SOCKET NOTIFICATION (EXISTING) ================= */

    io.to(String(postOwnerId)).emit("notification", {
      type: "like",
      fromUsername: liker.username,
      message: `@${liker.username} liked your post`
    });

    res.json({
      liked: true
    });

  } catch (error) {

    console.error("LIKE ERROR:", error);

    res.status(500).json({
      message: "Like failed"
    });

  }

};
