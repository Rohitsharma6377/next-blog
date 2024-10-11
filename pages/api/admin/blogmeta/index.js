import query from "@/lib/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

// Handle GET request
async function handleGetRequest(req, res) {
  const { type } = req.query;

  if(type) {
    try {
      const results = await query(`SELECT blogmeta.*, metatags.id AS meta_id, metatags.meta_title, metatags.meta_description FROM blogmeta LEFT JOIN metatags ON blogmeta.url = metatags.url WHERE blogmeta.type = ?`, [type]);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error accessing the database", error: error.message });
    }
  }

  else {
    try {
      const results = await query(`SELECT blogmeta.*, metatags.id AS meta_id, metatags.meta_title, metatags.meta_description FROM blogmeta LEFT JOIN metatags ON blogmeta.url = metatags.url`);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error accessing the database", error: error.message });
    }
  }
}

// Handle POST request
async function handlePostRequest(req, res) {
  const { type, name, url, meta_title, meta_description, status } = req.body;

  // Basic validation
  if (!type || !name || !url || !meta_title || !meta_description || status === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Inserting meta tags
    const metaInsertQuery = "INSERT INTO metatags (url, meta_title, meta_description) VALUES (?, ?, ?)";
    const metaResult = await query(metaInsertQuery, [url, meta_title, meta_description]);

    // Inserting blog metadata
    const blogMetaInsertQuery = "INSERT INTO blogmeta (type, name, url, status) VALUES (?, ?, ?, ?)";
    const blogMetaResult = await query(blogMetaInsertQuery, [type, name, url, status]);

    res.status(201).json({
      ...req.body,
      id: blogMetaResult.insertId,
      meta_id: metaResult.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error inserting data", error: error.message });
  }
}

// Handle PUT request
async function handlePutRequest(req, res) {
  const { id, type, name, url, meta_title, meta_description, status, meta_id } = req.body;

  // Basic validation
  if (!id || !meta_id || !type || !name || !url || !meta_title || !meta_description || status === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Updating meta tags
    const metaUpdateQuery = "UPDATE metatags SET url=?, meta_title=?, meta_description=? WHERE id=?";
    await query(metaUpdateQuery, [url, meta_title, meta_description, meta_id]);

    // Updating blog metadata
    const blogMetaUpdateQuery = "UPDATE blogmeta SET type=?, name=?, url=?, status=? WHERE id=?";
    await query(blogMetaUpdateQuery, [type, name, url, status, id]);

    res.status(200).json({ ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
}