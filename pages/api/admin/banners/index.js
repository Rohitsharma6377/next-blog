import query from "@/lib/db";

export default async function handler(req, res) {
  //get
  if (req.method === "GET") {
    const { model, model_id, page=1, items_per_page=10 } = req.query;
    const offset = (page - 1) * items_per_page;

    if(model_id) {
      try {
        const banners = await query(`SELECT banners.*, pages.name AS page_name, pages.url AS page_url, media.path AS media_path, media.alt AS media_alt, mobile_media.path AS mobile_media_path, mobile_media.alt AS mobile_media_alt FROM banners LEFT JOIN pages ON banners.model_id = pages.id LEFT JOIN media ON banners.media_id = media.id LEFT JOIN media AS mobile_media ON banners.mobile_media_id = mobile_media.id WHERE banners.model = ? AND banners.model_id = ? LIMIT ${parseInt(items_per_page)} OFFSET ${parseInt(offset)}`, [model, model_id]);
        
        // let totalRows;
        // if(banners.length < 10) totalRows = banners.length;
        const totalRows = await query("SELECT COUNT(id) AS count FROM banners WHERE model_id = ?", [model_id]);
        const totalPages = banners.length < 10 ? Math.ceil(totalRows[0].count / 10) : Math.ceil(totalRows[0].count / 10);
  
        res.status(200).json({ banners, totalPages });
      }
      
      catch (error) {
      res.status(500).json({ message: "Error accessing the database", error: error.message });
      }
    }

    else {
      try {
        const banners = await query(`SELECT banners.*, pages.name AS page_name, pages.url AS page_url, media.path AS media_path, media.alt AS media_alt, mobile_media.path AS mobile_media_path, mobile_media.alt AS mobile_media_alt FROM banners LEFT JOIN pages ON banners.model_id = pages.id LEFT JOIN media ON banners.media_id = media.id LEFT JOIN media AS mobile_media ON banners.mobile_media_id = mobile_media.id LIMIT ${parseInt(items_per_page)} OFFSET ${parseInt(offset)}`);
          
        // let totalRows;
        // if(banners.length < 10) totalRows = banners.length;
        const totalRows = await query("SELECT COUNT(id) AS count FROM banners");
        const totalPages = banners.length < 10 ? Math.ceil(totalRows[0].count / 10) : Math.ceil(totalRows[0].count / 10);
  
        res.status(200).json({ banners, totalPages });
      }
  
      catch (error) {
        res.status(500).json({ message: "Error accessing the database", error: error.message });
      }
    }
  }
}