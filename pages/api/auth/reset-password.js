import query from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { id, token, password } = req.body;

  // console.log(req.body);

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.id !== Number(id)) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const users = await query("SELECT id FROM users WHERE id = ?", [
      decoded.id,
    ]);
    // console.log('users', decoded.id, users);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // console.log('hashedPassword', hashedPassword, password);

    await query("UPDATE users SET password = ? WHERE id = ?", [
      hashedPassword,
      id,
    ]);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token" });
    } else {
      // console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
