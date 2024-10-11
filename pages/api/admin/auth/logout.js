// pages/api/logout.js

import { serialize } from "cookie";

export default function handler(req, res) {
  // Clear the cookie
  res.setHeader(
    "Set-Cookie",
    serialize("User", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1, // Expire the cookie immediately
      path: "/",
    }),
  );

  // Redirect user or send a JSON response
  res.status(200).json({ message: "Logged out successfully" });
}
