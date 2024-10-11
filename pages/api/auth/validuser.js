import jwt from "jsonwebtoken";
import query from "@/lib/db";
// import { middleware } from "@/config/Middleware/middleware";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const validUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, SECRET_KEY);

    const users = await query("SELECT email FROM users WHERE email = ?", [
      decoded.email,
    ]);
    if (users.length === 0) {
      throw new Error("User not found");
    }

    const user = users[0];
    res.status(200).send({ message: "User Found Successfully", user: decoded });
  } catch (error) {
    res.status(401).send({ message: "Unauthorized Token" });
  }
};

export default validUser;
