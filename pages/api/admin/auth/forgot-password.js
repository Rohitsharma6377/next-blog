// forgot-password.js
import query from "@/lib/db";
import { baseUrl } from "@/utils/helper";
import jwt from "jsonwebtoken";
// import nodemailer from 'nodemailer';

const ForgotPass = async (req, res) => {
  const { email } = req.body;

  try {
    const users = await query(
      "SELECT id, email, role FROM users WHERE email = ?",
      [email],
    );

    // console.log(users);

    if (users.length === 0) {
      return res.status(404).json({ message: "Invalid Email Address" });
    }

    const user = users[0];
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" },
    );
    const link = `${baseUrl}/reset-password/${user.id}/${token}`;
    // console.log(link); // Here you would send the email

    res.status(200).json({ message: "Password reset link has been sent." });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default ForgotPass;
