import prisma from "../config/prismaClient.js";

/* ================================
   GET COMMENTS
================================ */

export const getComments = async (req, res) => {

  const postId = Number(req.params.postId);

  try {

    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    res.json(comments);

  } catch (error) {

    console.error("GET COMMENTS ERROR:", error);
    res.status(500).json({ message: "Failed to load comments" });

  }
};


/* ================================
   ADD COMMENT
================================ */

export const addComment = async (req, res) => {

  const postId = Number(req.params.postId);
  const userId = Number(req.user.id);
  const { text, parentId } = req.body;

  try {

    const io = req.app.get("io");

    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        parentId: parentId || null,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    });

    /* ================= GET POST OWNER ================= */

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true }
    });

    if (!post) {
      return res.status(201).json(comment);
    }

    const postOwnerId = Number(post.userId);

    /* ================= BLOCK SELF NOTIFICATION ================= */

    if (postOwnerId === userId) {
      return res.status(201).json(comment);
    }

    /* ================= GET COMMENTER ================= */

    const commenter = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true }
    });

    if (!commenter) {
      return res.status(201).json(comment);
    }

    /* ================= REMOVE OLD COMMENT NOTIFICATIONS ================= */

    await prisma.notification.deleteMany({
      where: {
        type: "comment",
        senderId: userId,
        receiverId: postOwnerId,
        postId
      }
    });

    /* ================= SAVE NOTIFICATION ================= */

    const notification = await prisma.notification.create({
      data: {
        type: "comment",
        message: `@${commenter.username} commented on your post`,
        senderId: userId,
        receiverId: postOwnerId,
        postId
      }
    });

    /* ================= SOCKET NOTIFICATION ================= */

    if (io) {
      io.to(String(postOwnerId)).emit("notification", {
        id: notification.id,
        type: "comment",
        fromUsername: commenter.username,
        message: notification.message,
        postId,
        createdAt: notification.createdAt
      });
    }

    res.status(201).json(comment);

  } catch (error) {

    console.error("ADD COMMENT ERROR:", error);
    res.status(500).json({ message: "Comment failed" });

  }

};


/* ================================
   DELETE COMMENT
================================ */

export const deleteComment = async (req, res) => {

  const commentId = Number(req.params.id);
  const userId = Number(req.user.id);

  try {

    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      return res.status(404).json({ message: "Not found" });
    }

    if (Number(comment.userId) !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.comment.delete({
      where: { id: commentId }
    });

    res.json({ success: true });

  } catch (error) {

    console.error("DELETE COMMENT ERROR:", error);
    res.status(500).json({ message: "Delete failed" });

  }

};
