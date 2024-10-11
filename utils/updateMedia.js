import query from "@/lib/db";

export const updateMedia = async ({ mediaId, filename, altText, imagePath }) => {
  try {
    const sql = "UPDATE media SET media = ?, alt = ?, path = ? WHERE id = ?";
    const values = [filename, altText, imagePath, mediaId];
    const response = await query(sql, values);

    return response.affectedRows; // Returns the number of affected rows
  } catch (error) {
    console.error("Error updating media:", error);
    throw error;
  }
};