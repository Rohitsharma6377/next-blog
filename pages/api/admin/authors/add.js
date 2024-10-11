import query from "@/lib/db";
const formidable = require('formidable');
import { slugify } from "@/utils/helper";
import { uploadFile, config } from '@/utils/uploadFile';
import { insertMedia } from "@/utils/insertMedia";

export { config };

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form data', error: err.message });
      }
      
      try {
        const { name: [name], status: [status] } = fields;
        let bio = fields.bio ? parseInt(fields.bio[0]) : null;
        
        //Ensures table exists
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS authors (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            bio MEDIUMTEXT DEFAULT NULL,
            media_id INT,
            status TINYINT(1) NOT NULL DEFAULT 1,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
        `;
        await query(createTableSQL);

        // Step 2: Upload file and insert media
        const { fileUrl, fileName } = await uploadFile({ file: files.image[0], uploadDir: 'uploads/authors', fileName: slugify(`author ${name}`) });
        const mediaId = await insertMedia({ filename: fileName, altText: `author ${name}`, imagePath: fileUrl });

        // Step 3: Insert service data
        const insertSQL = "INSERT INTO authors (name, bio, status, media_id) VALUES (?, ?, ?, ?)";
        const results = await query(insertSQL, [name, bio, status, mediaId]);

        // Step 4: Respond with the new entry data
        res.status(201).json({ ...fields, media_id: mediaId, media_path: fileUrl, id: results.insertId });
      } 
      catch (error) {
        res.status(500).json({ message: "Error inserting data", error: error.message });
      }
    });
  }
}




// import query from "@/lib/db";
// const formidable = require('formidable')
// import { slugify } from "@/utils/helper";
// import { uploadFile, config } from '@/utils/uploadFile';
// import { insertMedia } from "@/utils/insertMedia";

// export { config };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const form = new formidable.IncomingForm();

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error parsing form data', error: err.message });
//       }

//       try {
//         const {  name: [name], url: [url], description: [description], status: [status] } = fields;
//         let display_order = fields.display_order ? parseInt(fields.display_order[0]) : null;

//         const { fileUrl, fileName } = await uploadFile({ file: files.image[0], uploadDir: 'uploads/services', fileName: slugify(`service ${name}`) });

//         const mediaId = await insertMedia({filename: fileName, altText: `service ${name}`, imagePath: fileUrl});
//         const sql = "INSERT INTO services (name, url, description, display_order, status, media_id) VALUES (?, ?, ?, ?, ?, ?)";
//         const results = await query(sql, [name, url, description, display_order, status, mediaId]);

//         res.status(201).json({ ...fields, media_id: mediaId, media_path: fileUrl, id: results.insertId });
//       } 
      
//       catch (error) {
//         res.status(500).json({ message: "Error inserting data", error: error.message });
//       }
//     })
//   }
// }