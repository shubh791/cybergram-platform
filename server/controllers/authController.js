import prisma from "../config/prismaclient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


/* ================= REGISTER ================= */

export const register = async (req, res) => {

  const { name, username, email, password } = req.body;

  try {

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {

    console.error("REGISTER ERROR:", err);

    if (err.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Username or Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed"
    });

  }

};


/* ================= LOGIN (EMAIL OR USERNAME) ================= */

export const login = async (req, res) => {

  const { login, password } = req.body; // login = email OR username

  try {

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ Find user by email OR username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: login },
          { username: login }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // ✅ JWT TOKEN (unchanged structure)
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });

  } catch (err) {

    console.error("LOGIN ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Login failed"
    });

  }

};


/* ================= USERNAME CHECK ================= */

export const checkUsername = async (req, res) => {

  const { username } = req.params;

  try {

    const user = await prisma.user.findUnique({
      where: { username }
    });

    res.json({
      available: !user
    });

  } catch (err) {

    console.error("USERNAME CHECK ERROR:", err);

    res.status(500).json({
      available: false
    });

  }

};
