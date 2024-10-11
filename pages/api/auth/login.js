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
    [userDetails.email, userDetails.userPassword, role, token, userId],
  );
  return token;
};

const loginUser = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  try {
    const users = await query(
      "SELECT id, password, role FROM users WHERE email = ?",
      [email],
    );
    if (users.length === 0) {
      return res.status(404).json({ message: "Invalid email" });
    }

    // console.log(req.body);
    // console.log(users);

    const userId = users[0].id;
    const userPassword = users[0].password;
    const userRole = users[0].role;

    // console.log({userId, userPassword});
    const isMatch = await bcrypt.compare(password, userPassword);

    // console.log(isMatch);

    if (!isMatch) {
      // console.log('isMatch', isMatch);
      return res.status(404).json({ message: "Password invalid" });
    }

    const token = await generateToken(
      userId,
      { email, userPassword },
      userRole,
    );

    res.status(200).json({ message: "Successful login", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

export default loginUser;