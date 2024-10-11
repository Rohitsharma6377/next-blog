import query from "@/lib/db";

export const insertMedia = async ({ filename, altText, imagePath }) => {
    try {
      //Ensures table exists
      const createTableSQL = `
      CREATE TABLE IF NOT EXISTS media (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        media VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL,
        path VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await query(createTableSQL);

      const sql = "INSERT INTO media (media, alt, path) VALUES (?, ?, ?)";
      const values = [filename, altText, imagePath];
      const response = await query(sql, values);
      return response.insertId;

    } catch (error) {
      console.error("Error inserting media:", error);
      throw error;
    }
};