import query from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, url, meta_title, meta_description } = req.body;

    try {
      const sql = "UPDATE metatags SET url = ?, meta_title = ?, meta_description = ? WHERE id = ?";
      const results = await query(sql, [url, meta_title, meta_description, id]);
      const currentDate = new Date(Date.now()).toISOString();

      res.status(200).json({ ...req.body, updated_at: currentDate });
    } 
    
    catch (error) {
      res.status(500).json({ message: "Error updating data", error: error.message });
    }
  } 
  
  else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}