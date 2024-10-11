import query from "@/lib/db";
const formidable = require('formidable');
import { slugify, test } from "@/utils/helper";
import { uploadFile, config } from '@/utils/uploadFile';
import { deleteFile } from "@/utils/deleteFile";
import { insertMedia } from "@/utils/insertMedia";
import { updateMedia } from "@/utils/updateMedia";

export { config };

export default async function handler(req, res) {
  if (req.method === 'PUT') {
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
          meta_description: [meta_description],
          id: [id],
          meta_id: [meta_id]
        } = fields;

        let faq_title = fields.faq_title && fields.faq_title[0] !== "null" ? fields.faq_title[0] : null;
        let faq_description = fields.faq_description && fields.faq_description[0] !== "null" ? fields.faq_description[0] : null;
        let testimonial_title = fields.testimonial_title && fields.testimonial_title[0] !== "null" ? fields.testimonial_title[0] : null;
        let testimonial_description = fields.testimonial_description && fields.testimonial_description[0] !== "null" ? fields.testimonial_description[0] : null;
        let content = fields.content && fields.content[0] !== "null" ? fields.content[0] : null;

        let media_id = fields.media_id ? fields.media_id[0] : null;
        let cover_id = fields.cover_id ? fields.cover_id[0] : null;
        let media_path = fields.media_path ? fields.media_path[0] : null;
        let cover_path = fields.cover_path ? fields.cover_path[0] : null;

        // Upload Data for images and cover
        let uploadData = {
          imageData: {
            fileName: null,
            fileUrl: null,
          },
          coverData: {
            fileName: null,
            fileUrl: null
          }
        };

        if (files.image) {
          uploadData.imageData = await uploadFile({ file: files.image[0], uploadDir: 'uploads/pages', fileName: slugify(`page ${name}`) });
          if (media_id != "null") {
            deleteFile(media_path);
            await updateMedia({ mediaId: media_id, filename: uploadData.imageData.fileName, altText: `page ${name}`, imagePath: uploadData.imageData.fileUrl });
          } else {
            media_id = await insertMedia({ filename: uploadData.imageData.fileName, altText: `page ${name}`, imagePath: uploadData.imageData.fileUrl });
          }
        }
        
        if (files.cover) {
          uploadData.coverData = await uploadFile({ file: files.cover[0], uploadDir: 'uploads/pages', fileName: slugify(`page ${name}`) });
          if (cover_id != "null") {
            deleteFile(cover_path);
            await updateMedia({ mediaId: cover_id, filename: uploadData.coverData.fileName, altText: `page ${name}`, imagePath: uploadData.coverData.fileUrl });
          } else {
            cover_id = await insertMedia({ filename: uploadData.coverData.fileName, altText: `page ${name}`, imagePath: uploadData.coverData.fileUrl });
          }
        }

        // Update the metatags
        const sql3 = "UPDATE metatags SET url=?, meta_title=?, meta_description=?, media_id=? WHERE id=?";
        await query(sql3, [url, meta_title, meta_description, media_id, meta_id]);

        // Update the page itself
        const sql1 = "UPDATE pages SET name=?, url=?, model=?, sitemap=?, `schema`=?, status=?, media_id=?, cover_id=?, content=? WHERE id=?";
        await query(sql1, [
          name,
          url,
          model,
          sitemap,
          schema,
          status,
          media_id,
          cover_id,
          content,
          id
        ]);

        // Update the page details
        const sql2 = "UPDATE page_details SET faq_title=?, faq_description=?, testimonial_title=?, testimonial_description=? WHERE page_id=?";
        await query(sql2, [faq_title, faq_description, testimonial_title, testimonial_description, id]);

        res.status(201).json({
          ...fields,
          media_id,
          media_path: uploadData.imageData.fileUrl,
          cover_id,
          cover_path: uploadData.coverData.fileUrl
        });
      } 
      
      catch (error) {
        res.status(500).json({ message: "Error updating data", error: error.message });
      }
    });
  }
}