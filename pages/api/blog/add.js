import query from "@/lib/db";
const formidable = require('formidable');
import { slugify, test } from "@/utils/helper";
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
        const { title: [title], url: [url], category: [category], tags: [tags], author: [author], meta_title: [meta_title], meta_description: [meta_description], content: [content] } = fields;

        //Ensures table exists
        const createTableSQL = `
          CREATE TABLE IF NOT EXISTS services (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL,
            description MEDIUMTEXT NOT NULL,
            media_id INT,
            status TINYINT(1) NOT NULL DEFAULT 1,
            display_order INT DEFAULT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          );
        `;
        // await query(createTableSQL);
        
        // Step 2: Upload file and insert media
        const { fileUrl, fileName } = await uploadFile({ file: files.image[0], uploadDir: 'uploads/blogs', fileName: slugify(`blog ${title}`)});
        const mediaId = await insertMedia({ filename: fileName, altText: `blog ${title}`, imagePath: fileUrl });
        
        // Step 3: metatags
        const metaSQL = "INSERT INTO metatags (url, meta_title, meta_description, media_id) VALUES (?, ?, ?, ?)";
        const results1 = await query(metaSQL, [url, meta_title, meta_description, mediaId]);

        const meta_id = results1.insertId;

        // Step 4: blogs
        const insertBlog = "INSERT INTO blogs (title, url, content, author_id, media_id) VALUES (?, ?, ?, ?, ?)";
        const results2 = await query(insertBlog, [title, url, content, author, mediaId]);

        const blog_id = results2.insertId;
        
        // Step 5: blog_blogmeta
        const catArray = category && category.split(',').map(Number);
        test(catArray)

        catArray && catArray.map( async (id) => {
          const insertBlogmeta = "INSERT INTO blog_blogmeta (blog_id, blogmeta_id) VALUES (?, ?)";
          await query(insertBlogmeta, [blog_id, id]);
        })
        
        const tagArray = tags && tags.split(',').map(Number);
        test(tagArray)

        tagArray && tagArray.map( async (id) => {
          const insertBlogmeta = "INSERT INTO blog_blogmeta (blog_id, blogmeta_id) VALUES (?, ?)";
          await query(insertBlogmeta, [blog_id, id]);
        })

        // Step 4: Respond with the new entry data
        res.status(201).json({ ...fields, media_id: mediaId, media_path: fileUrl, id: blog_id, meta_id: meta_id });
      } 
      catch (error) {
        res.status(500).json({ message: "Error inserting data", error: error.message });
      }
    });
  }
}