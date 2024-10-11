import query from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { url } = req.query;

    try {
      const results = await query("SELECT pages.*, metatags.id AS meta_id, metatags.media_id AS meta_media_id, metatags.meta_title, metatags.meta_description, page_details.faq_title, page_details.faq_description, page_details.testimonial_title, page_details.testimonial_description, COUNT(faqs.id) AS faqs_count, COUNT(testimonials.id) AS testimonials_count, media_image.path AS media_path, media_cover.path AS cover_path FROM pages LEFT JOIN metatags ON pages.url = metatags.url LEFT JOIN page_details ON pages.id = page_details.page_id LEFT JOIN faqs ON pages.id = faqs.model_id LEFT JOIN testimonials ON pages.id = testimonials.model_id LEFT JOIN media AS media_image ON pages.media_id = media_image.id LEFT JOIN media AS media_cover ON pages.cover_id = media_cover.id WHERE pages.url = ? GROUP BY pages.id, metatags.id, metatags.media_id, metatags.meta_title, metatags.meta_description, page_details.faq_title, page_details.faq_description, page_details.testimonial_title, page_details.testimonial_description, media_image.path, media_cover.path", [url]);

      res.status(200).json(results);
    } 
    
    catch (error) {
      res.status(500).json({ message: "Error accessing the database", error: error.message });
    }
  }
}
