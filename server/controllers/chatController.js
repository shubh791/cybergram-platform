import prisma from "../config/prismaClient.js";

/* ===============================
   SEND MESSAGE
================================ */

export const sendMessage = async (req, res) => {

  try {

    const senderId = req.user.id;
    const { receiverId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const message = await prisma.message.create({

      data: {
        senderId,
        receiverId,
        content
      },

      include: {
        sender: {
          select: {
            username: true,
            avatar: true
          }
        }
      }

    });

    // ================= SOCKET REALTIME =================

    const io = req.app.get("io");

    if (io) {

      io.to(String(receiverId)).emit("new_message", {
        ...message,
        senderUsername: message.sender.username
      });

    }

    res.status(201).json(message);

  } catch (error) {

    console.log("SEND MESSAGE ERROR:", error);

    res.status(500).json({ message: "Message failed" });

  }

};



/* ===============================
   GET CHAT HISTORY (FILTERED)
================================ */

export const getMessages = async (req, res) => {

  try {

    const userId = req.user.id;
    const otherUserId = Number(req.params.userId);

    const messages = await prisma.message.findMany({

      where: {

        OR: [

          // Messages I sent (not deleted by me)
          {
            senderId: userId,
            receiverId: otherUserId,
            deletedBySender: false
          },

          // Messages I received (not deleted by me)
          {
            senderId: otherUserId,
            receiverId: userId,
            deletedByReceiver: false
          }

        ]

      },

      orderBy: {
        createdAt: "asc"
      }

    });

    res.json(messages);

  } catch (error) {

    console.log("FETCH CHAT ERROR:", error);

    res.status(500).json({ message: "Fetch failed" });

  }

};



/* ===============================
   MARK MESSAGE SEEN
================================ */

export const markSeen = async (req, res) => {

  try {

    const messageId = Number(req.params.id);

    await prisma.message.update({

      where: {
        id: messageId
      },

      data: {
        read: true,
        status: "seen"
      }

    });

    res.json({ success: true });

  } catch (error) {

    console.log("SEEN ERROR:", error);

    res.status(500).json({ message: "Seen update failed" });

  }

};



/* ===============================
   CLEAR CHAT FOR ME ONLY
================================ */

export const deleteChatForMe = async (req, res) => {

  try {

    const userId = req.user.id;
    const otherUserId = Number(req.params.userId);

    // ================= I AM SENDER =================

    await prisma.message.updateMany({

      where: {
        senderId: userId,
        receiverId: otherUserId
      },

      data: {
        deletedBySender: true
      }

    });

    // ================= I AM RECEIVER =================

    await prisma.message.updateMany({

      where: {
        senderId: otherUserId,
        receiverId: userId
      },

      data: {
        deletedByReceiver: true
      }

    });

    res.json({
      success: true,
      message: "Chat cleared for you"
    });

  } catch (error) {

    console.log("DELETE CHAT ERROR:", error);

    res.status(500).json({ message: "Delete failed" });

  }

};



/* ===============================
   CHAT SIDEBAR USERS
================================ */

export const getChatUsers = async (req, res) => {

  try {

    const userId = req.user.id;

    const users = await prisma.user.findMany({

      where: {
        id: { not: userId }
      },

      select: {
        id: true,
        username: true,
        avatar: true
      }

    });

    res.json(users);

  } catch (error) {

    console.log("CHAT LIST ERROR:", error);

    res.status(500).json({ message: "Failed" });

  }

};
