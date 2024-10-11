import query from "@/lib/db";
const formidable = require('formidable')
import { slugify, test } from "@/utils/helper";
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
      
      test(fields)
      try {
        const { id: [id], title: [title], url: [url], category: [category], tags: [tags], author_id: [author_id], meta_title: [meta_title], meta_description: [meta_description], content: [content], meta_id: [meta_id] } = fields;
        let { media_id: [media_id], media_path: [media_path] } = fields;


        // Step 1: Upload file and insert media
        if (Object.keys(files).length > 0) {
          if(media_id != "null") deleteFile(media_path);
          
          const { fileUrl, fileName } = await uploadFile({ file: files.image[0], uploadDir: 'uploads/blogs', fileName: slugify(`blog ${title}`)});
          media_path = fileUrl;
          
          if(media_id != "null") {
            const affectedRows = await updateMedia({mediaId: media_id, filename: fileName, altText: `blog ${title}`, imagePath: fileUrl});
          }
          else {
            media_id = await insertMedia({ filename: fileName, altText: `blog ${title}`, imagePath: fileUrl });
          }
        }

        // Step 2: metatags
        const metaSQL = "UPDATE metatags SET url=?, meta_title=?, meta_description=?, media_id=? WHERE id=?";
        const results1 = await query(metaSQL, [url, meta_title, meta_description, media_id, meta_id]);

        // Step 3: blogs
        const insertBlog = "UPDATE blogs SET title=?, url=?, content=?, author_id=?, media_id=? WHERE id=?";
        const results2 = await query(insertBlog, [title, url, content, author_id, media_id, id]);
        
        // Step 4: delete from blog_blogmeta
        const insertBlogmeta = "DELETE FROM blog_blogmeta WHERE blog_id=?";
        const results3 = await query(insertBlogmeta, [id]);

        // Step 5: add new enteries to blog_blogmeta
        const catArray = category && category.split(',').map(Number);

        catArray && catArray.map( async (blogmeta_id) => {
          const insertBlogmeta = "INSERT INTO blog_blogmeta (blog_id, blogmeta_id) VALUES (?, ?)";
          await query(insertBlogmeta, [id, blogmeta_id]);
        })
        
        const tagArray = tags && tags.split(',').map(Number);

        tagArray && tagArray.map( async (blogmeta_id) => {
          const insertBlogmeta = "INSERT INTO blog_blogmeta (blog_id, blogmeta_id) VALUES (?, ?)";
          await query(insertBlogmeta, [id, blogmeta_id]);
        })

        res.status(201).json({ ...fields, media_id, media_path, meta_id, id });
      }

      catch (error) {
        res.status(500).json({ message: "Error inserting data", error: error.message });
      }
    })
  }
}