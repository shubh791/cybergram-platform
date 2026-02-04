import prisma from "../config/prismaClient.js";

export const toggleSave = async (req, res) => {

  try {

    const userId = req.user.id;
    const postId = Number(req.params.postId);

    if (!postId) {
      return res.status(400).json({
        message: "Invalid post id"
      });
    }

    // Check already saved
    const existing = await prisma.save.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    });

    // ================= UNSAVE =================

    if (existing) {

      await prisma.save.delete({
        where: { id: existing.id }
      });

      return res.json({
        saved: false
      });

    }

    // ================= SAVE =================

    await prisma.save.create({
      data: {
        userId,
        postId
      }
    });

    res.json({
      saved: true
    });

  } catch (error) {

    console.error("SAVE ERROR:", error);

    res.status(500).json({
      message: "Save failed"
    });

  }

};
