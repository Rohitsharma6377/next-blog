import query from "@/lib/db";

export default async function handler(req, res) {
  //get
  if (req.method === "GET") {
    try {
      const results = await query("SELECT metatags.*, media.path AS media_path, media.alt AS media_alt FROM metatags LEFT JOIN media ON metatags.media_id = media.id");
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({
        message: "Error accessing the database",
        error: error.message,
      });
    }
  }
}
