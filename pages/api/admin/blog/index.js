import query from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    if(id) {
      try {
        const results = await query("SELECT blogs.*, blog_media.path AS media_path, blog_media.alt AS media_alt, author_media.path AS author_media_path, author_media.alt AS author_media_alt, metatags.id AS meta_id, metatags.media_id AS meta_media_id, metatags.meta_title, metatags.meta_description, GROUP_CONCAT(CASE WHEN blogmeta.type = 'category' THEN blogmeta.id END ORDER BY blog_blogmeta.blogmeta_id) AS category, GROUP_CONCAT(CASE WHEN blogmeta.type = 'tag' THEN blogmeta.id END ORDER BY blog_blogmeta.blogmeta_id) AS tags, GROUP_CONCAT(CASE WHEN blogmeta.type = 'category' THEN blogmeta.name END ORDER BY blog_blogmeta.blogmeta_id) AS category_name, GROUP_CONCAT(CASE WHEN blogmeta.type = 'tag' THEN blogmeta.name END ORDER BY blog_blogmeta.blogmeta_id) AS tags_name FROM blogs LEFT JOIN media AS blog_media ON blogs.media_id = blog_media.id LEFT JOIN authors ON blogs.author_id = authors.id LEFT JOIN media AS author_media ON authors.media_id = author_media.id LEFT JOIN metatags ON blogs.url = metatags.url LEFT JOIN blog_blogmeta ON blogs.id = blog_blogmeta.blog_id LEFT JOIN blogmeta ON blog_blogmeta.blogmeta_id = blogmeta.id WHERE blogs.id = ? GROUP BY blogs.id, blog_media.path, blog_media.alt, author_media.path, author_media.alt, metatags.id, metatags.media_id, metatags.meta_title, metatags.meta_description", [id]);
        res.status(200).json(results);
      }
      
      catch (error) {
        res.status(500).json({ message: "Error accessing the database", error: error.message });
      }
    }

    else {
      try {
        const results = await query("SELECT blogs.*, blog_media.path AS media_path, blog_media.alt AS media_alt, author_media.path AS author_media_path, author_media.alt AS author_media_alt, metatags.id AS meta_id, metatags.media_id AS meta_media_id, metatags.meta_title, metatags.meta_description, GROUP_CONCAT(CASE WHEN blogmeta.type = 'category' THEN blogmeta.id END ORDER BY blog_blogmeta.blogmeta_id) AS category, GROUP_CONCAT(CASE WHEN blogmeta.type = 'tag' THEN blogmeta.id END ORDER BY blog_blogmeta.blogmeta_id) AS tags, GROUP_CONCAT(CASE WHEN blogmeta.type = 'category' THEN blogmeta.name END ORDER BY blog_blogmeta.blogmeta_id) AS category_name, GROUP_CONCAT(CASE WHEN blogmeta.type = 'tag' THEN blogmeta.name END ORDER BY blog_blogmeta.blogmeta_id) AS tags_name FROM blogs LEFT JOIN media AS blog_media ON blogs.media_id = blog_media.id LEFT JOIN authors ON blogs.author_id = authors.id LEFT JOIN media AS author_media ON authors.media_id = author_media.id LEFT JOIN metatags ON blogs.url = metatags.url LEFT JOIN blog_blogmeta ON blogs.id = blog_blogmeta.blog_id LEFT JOIN blogmeta ON blog_blogmeta.blogmeta_id = blogmeta.id GROUP BY blogs.id, blog_media.path, blog_media.alt, author_media.path, author_media.alt, metatags.id, metatags.media_id, metatags.meta_title, metatags.meta_description");
        res.status(200).json(results);
      }

      catch (error) {
        res.status(500).json({ message: "Error accessing the database", error: error.message });
      }
    }
  }
}