import prisma from "../config/prismaclient.js";

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
      select: {
        id: true
      }
    });

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found"
      });
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

      return res.json({
        following: false
      });

    }

    /* ================= CREATE FOLLOW ================= */

    await prisma.follow.create({
      data: {
        followerId,
        followingId: targetUserId
      }
    });

    /* ================= GET FOLLOWER USERNAME ================= */

    const followerUser = await prisma.user.findUnique({
      where: { id: followerId },
      select: { username: true }
    });

    if (!followerUser || !io) {
      return res.json({ following: true });
    }

    /* ================= SOCKET NOTIFICATION ================= */

    io.to(String(targetUserId)).emit("notification", {
      type: "follow",
      fromUsername: followerUser.username,
      message: `@${followerUser.username} started following you`
    });

    res.json({
      following: true
    });

  } catch (error) {

    console.log("FOLLOW ERROR:", error);

    res.status(500).json({
      message: "Follow failed"
    });

  }

};
