import query from "@/lib/db";

export default async function handler(req, res) {
  //get users
  if (req.method === "GET") {
    try {
      const results = await query("SELECT * FROM users");
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({
        message: "Error accessing the database",
        error: error.message,
      });
    }
  }

  //update users
  else if (req.method === "PUT") {
    const { id, name, email, phone, role, created_at } = req.body;

    try {
      // // console.log( req.body)
      const sql =
        "UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?";
      const results = await query(sql, [name, email, phone, role, id]);
      res.status(200).json({ message: "Entry updated", data: req.body });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating data", error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
