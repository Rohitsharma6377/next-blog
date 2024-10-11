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
        let { 
          name: [name], 
          url: [url], 
          model: [model], 
          sitemap: [sitemap], 
          schema: [schema], 
          status: [status], 
          meta_title: [meta_title], 
          meta_description: [meta_description] 
        } = fields;

        let faq_title = fields.faq_title ? fields.faq_title[0] : null;
        let faq_description = fields.faq_description ? fields.faq_description[0] : null;
        let testimonial_title = fields.testimonial_title ? fields.testimonial_title[0] : null;
        let testimonial_description = fields.testimonial_description ? fields.testimonial_description[0] : null;
        let content = fields.content ? fields.content[0] : null;

        // Upload Data for images and cover
        let uploadData = {
          imageData: {
            fileName: null,
            fileUrl: null
          },
          coverData: {
            fileName: null,
            fileUrl: null
          }
        };

        if (files.image) {
          uploadData.imageData = await uploadFile({ file: files.image[0], uploadDir: 'uploads/pages', fileName: slugify(`page ${name}`) });
          uploadData.imageId = await insertMedia({filename: uploadData.imageData.fileName, altText: `page ${name}`, imagePath: uploadData.imageData.fileUrl});
        }

        if (files.cover) {
          uploadData.coverData = await uploadFile({ file: files.cover[0], uploadDir: 'uploads/pages', fileName: slugify(`page ${name}`) });
          uploadData.coverId = await insertMedia({filename: uploadData.coverData.fileName, altText: `page ${name}`, imagePath: uploadData.coverData.fileUrl});
        }

        // Insert data into `pages` table
        const sql1 = "INSERT INTO pages (name, url, model, sitemap, `schema`, status, media_id, cover_id, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const results1 = await query(sql1, [name, url, model, sitemap, schema, status, uploadData.imageId ? uploadData.imageId : null, uploadData.coverId ? uploadData.coverId : null, content]);
        const page_id = results1.insertId;

        // Insert data into `page_details` table
        const sql2 = "INSERT INTO page_details (page_id, faq_title, faq_description, testimonial_title, testimonial_description) VALUES (?, ?, ?, ?, ?)";
        await query(sql2, [page_id, faq_title, faq_description, testimonial_title, testimonial_description]);

        // Insert data into `metatags` table
        const sql3 = "INSERT INTO metatags (url, meta_title, meta_description, media_id) VALUES (?, ?, ?, ?)";
        await query(sql3, [url, meta_title, meta_description, uploadData.imageId ? uploadData.imageId : null]);

        res.status(201).json({
          ...fields,
          media_id: uploadData.imageId,
          media_path: uploadData.imageData.fileUrl,
          cover_id: uploadData.coverId,
          cover_path: uploadData.coverData.fileUrl,
          id: page_id
        });
      } catch (error) {
        res.status(500).json({ message: "Error inserting data", error: error.message });
      }
    });
  }
}