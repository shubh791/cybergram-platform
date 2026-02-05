import prisma from "../config/prismaClient.js";

/* ===========================
   FOLLOW / UNFOLLOW TOGGLE
=========================== */

export const toggleFollow = async (req, res) => {

  try {

    const followerId = Number(req.user.id);
    const { username } = req.params;

    const io = req.app.get("io");

    /* ================= TARGET USER ================= */

    const targetUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true }
    });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const targetUserId = Number(targetUser.id);

    /* ================= BLOCK SELF FOLLOW ================= */

    if (targetUserId === followerId) {
      return res.status(400).json({
        message: "You cannot follow yourself"
      });
    }

    /* ================= CHECK EXISTING ================= */

    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId: targetUserId
      }
    });

    /* ================= UNFOLLOW ================= */

    if (existingFollow) {

      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });

      return res.json({ following: false });
    }

    /* ================= CREATE FOLLOW ================= */

    await prisma.follow.create({
      data: {
        followerId,
        followingId: targetUserId
      }
    });

    /* ================= GET FOLLOWER USER ================= */

    const followerUser = await prisma.user.findUnique({
      where: { id: followerId },
      select: { username: true }
    });

    if (!followerUser) {
      return res.json({ following: true });
    }

    /* ================= REMOVE OLD FOLLOW NOTIFICATIONS ================= */

    await prisma.notification.deleteMany({
      where: {
        type: "follow",
        senderId: followerId,
        receiverId: targetUserId
      }
    });

    /* ================= SAVE NOTIFICATION ================= */

    const notification = await prisma.notification.create({
      data: {
        type: "follow",
        message: `@${followerUser.username} started following you`,
        senderId: followerId,
        receiverId: targetUserId
      }
    });

    /* ================= SOCKET NOTIFICATION ================= */

    if (io) {
      io.to(String(targetUserId)).emit("notification", {
        id: notification.id,
        type: "follow",
        fromUsername: followerUser.username,
        message: notification.message,
        createdAt: notification.createdAt
      });
    }

    res.json({ following: true });

  } catch (error) {

    console.log("FOLLOW ERROR:", error);

    res.status(500).json({
      message: "Follow failed"
    });

  }

};
