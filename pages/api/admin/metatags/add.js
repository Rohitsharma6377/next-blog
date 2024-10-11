import query from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url, meta_title, meta_description } = req.body;

    console.log('////////', req.body);
    
    try {
      //Ensures table exists
      // const createTableSQL = `
      // CREATE TABLE metatags (
      // id BIGINT AUTO_INCREMENT PRIMARY KEY,
      // model VARCHAR(255) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
      // model_id INT DEFAULT NULL,
      // url VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
      // meta_title VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
      // meta_description MEDIUMTEXT COLLATE utf8mb4_0900_ai_ci NOT NULL,
      // media_id INT DEFAULT NULL,
      // created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      // updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      //   );
      // `;
      // await query(createTableSQL);

      const sql = "INSERT INTO metatags (url, meta_title, meta_description) VALUES (?, ?, ?)";
      const results = await query(sql, [url, meta_title, meta_description]);
      res.status(201).json({ ...req.body, id: results.insertId });
    } 
    
    catch (error) {
      res.status(500).json({ message: "Error inserting data", error: error.message });
    }
  }
}