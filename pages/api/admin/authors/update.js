import query from "@/lib/db";
const formidable = require('formidable')
import { slugify } from "@/utils/helper";
import { uploadFile, config } from '@/utils/uploadFile';
import { deleteFile } from "@/utils/deleteFile";
import { updateMedia } from "@/utils/updateMedia";
import { insertMedia } from "@/utils/insertMedia";

export { config };

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form data', error: err.message });
      }

      try {
        const { id: [id], name: [name], status: [status] } = fields;
        let { media_id: [media_id], media_path: [media_path] } = fields;
        let bio = fields.bio && fields.bio[0] !== "null" ? fields.bio[0] : null;

        if (Object.keys(files).length > 0) {
          if(media_id != "null") deleteFile(media_path);
          
          const { fileUrl, fileName } = await uploadFile({ file: files.image[0], uploadDir: 'uploads/authors', fileName: slugify(`author ${name}`) });
          media_path = fileUrl;
          
          if(media_id != "null") {
            const affectedRows = await updateMedia({mediaId: media_id, filename: fileName, altText: `author ${name}`, imagePath: fileUrl});
          }
          else {
            media_id = await insertMedia({filename: fileName, altText: `author ${name}`, imagePath: fileUrl});
          }
        }
        
        const sql = "UPDATE authors SET name = ?, bio = ?, status = ?, media_id = ? WHERE id = ?";
        const results = await query(sql, [name, bio, status, media_id, id]);
        res.status(201).json({ ...fields, media_id: media_id, media_path: media_path });
      }

      catch (error) {
        res.status(500).json({ message: "Error inserting data", error: error.message });
      }
    })
  }
}