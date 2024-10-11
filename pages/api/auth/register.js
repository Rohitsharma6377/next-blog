import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import query from "@/lib/db";

const generateToken = async (userId, userDetails, role) => {
  const token = jwt.sign(
    { id: userId, email: userDetails.email, role: role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" },
  );
  await query(
    "UPDATE users SET email=?, password=?, role=?, jwt_token=? WHERE id=?",
    [userDetails.email, userDetails.hashedPassword, role, token, userId],
  );
  return token;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const registerUser = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;

  try {
    const existingUsers = await query(
      "SELECT email FROM users WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const result = await query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
    );

    // Generate token
    const token = await generateToken(
      result.insertId,
      { email, hashedPassword },
      "user",
    );

    res.status(200).json({ message: "User successfully registered", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error inserting data", error: error.message });
  }
};

export default registerUser;