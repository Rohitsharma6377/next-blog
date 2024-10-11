import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import query from "@/lib/db";

// Generate JWT without storing in DB
const generateToken = (userId, userDetails, role) => {
  const token = jwt.sign(
    { id: userId, email: userDetails.email, role: role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
  return token;
};

// Login API
const loginUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  try {
    const users = await query(
      "SELECT id, password, role FROM users WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "Invalid email" });
    }

    const userId = users[0].id;
    const userPassword = users[0].password;
    const userRole = users[0].role;

    // Compare passwords
    const isMatch = await bcrypt.compare(password, userPassword);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }

    // Generate JWT without storing in DB
    const token = generateToken(userId, { email, userPassword }, userRole);

    res.status(200).json({ message: "Successful login", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export default loginUser;
