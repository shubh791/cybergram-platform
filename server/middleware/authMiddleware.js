import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {

  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ JWT_SECRET missing in environment");
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    console.log("JWT ERROR:", error.message);

    return res.status(401).json({ message: "Invalid token" });

  }

}
