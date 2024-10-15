// pages/api/updateBlog.js

import query from "@/lib/db";

const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};


//Ensures table exists
const createTableSQL = `
CREATE TABLE banners (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  model_id INT NOT NULL,
  status TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT DEFAULT NULL,
  media_id INT DEFAULT NULL,
  mobile_media_id INT DEFAULT NULL,
  url VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  heading VARCHAR(255) COLLATE utf8mb4_0900_ai_ci NOT NULL,
  text MEDIUMTEXT COLLATE utf8mb4_0900_ai_ci NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;
await query(createTableSQL);


export default async function handler(req, res) {
  const { currentPageUrl } = req.query;

  //get
  // if (req.method === 'GET' && currentPageUrl) {
  //   try {
  //     const results = await query('SELECT * FROM banners WHERE url = ?', [currentPageUrl]);
  //     res.status(200).json(results);
  //   } catch (error) {
  //     res.status(500).json({ message: 'Error accessing the database', error: error.message });
  //   }
  // }

  //get
  if (req.method === "GET") {
    try {
      const results = await query("SELECT * FROM banners");
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({
        message: "Error accessing the database",
        error: error.message,
      });
    }
  }

  //add
  else if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    // // console.log('form', form);
    form.parse(req, async function (err, fields, files) {
      //// console.log('files', fields);
      let savedPath = {};



      const uploadImage = () => {
        const oldPath = files.image[0].filepath;
        const newPath =
          path.join(process.cwd(), "public/uploads/blogs") +
          "/" +
          files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = "uploads/blogs/" + files.image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
        });
      };

      if (Object.keys(files).includes("image")) {
        uploadImage();
      }

      const uploadMobileImage = () => {
        const oldPath = files.mobile_image[0].filepath;
        const newPath =
          path.join(process.cwd(), "public/uploads/blogs") +
          "/" +
          files.mobile_image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.mobile_image =
          "uploads/blogs/" + files.mobile_image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
        });
      };

      if (Object.keys(files).includes("mobile_image")) {
        uploadMobileImage();
      }

      // saveToDB
      const {
        model_type: [model_type],
        model: [model],
        status: [status],
        display_order: [display_order],
        url: [url],
        heading: [heading],
        text: [text],
      } = fields;

      let image_path = "";
      let mobile_image_path = "";

      if (fields.image) {
        image_path = fields.image[0];
      }

      if (fields.mobile_image) {
        mobile_image_path = fields.mobile_image[0];
      }

      const params = [
        model_type,
        model,
        status,
        display_order,
        savedPath.image ? savedPath.image : image_path,
        savedPath.mobile_image ? savedPath.mobile_image : mobile_image_path,
        url,
        heading,
        text,
      ];

      // // console.log(name);
      // console.log('fields', fields);

      try {
        const sql =
          "INSERT INTO `banners`(`model_type`, `model`, `status`, `display_order`, `image`, `mobile_image`, `url`, `heading`, `text`) VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const results = await query(sql, params);
        res.status(201).json({
          message: "Entry added",
          data: {
            ...fields,
            image: savedPath.image,
            mobile_image: savedPath.mobile_image,
          },
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error inserting data", error: error.message });
        // console.log(error.message);
      }
    });
  }

  //update
  else if (req.method === "PUT") {
    const form = new formidable.IncomingForm();

    // // console.log('form', form);
    form.parse(req, async function (err, fields, files) {
      //// console.log('files', fields);
      let savedPath = {};

      const uploadImage = () => {
        const oldPath = files.image[0].filepath;
        const newPath =
          path.join(process.cwd(), "public/uploads/blogs") +
          "/" +
          files.image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.image = "uploads/blogs/" + files.image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
        });
      };

      if (Object.keys(files).includes("image")) {
        uploadImage();
      }

      const uploadMobileImage = () => {
        const oldPath = files.mobile_image[0].filepath;
        const newPath =
          path.join(process.cwd(), "public/uploads/blogs") +
          "/" +
          files.mobile_image[0].originalFilename;
        const rawData = fs.readFileSync(oldPath);

        savedPath.mobile_image =
          "uploads/blogs/" + files.mobile_image[0].originalFilename;

        const uploadDir = path.join(process.cwd(), "public/uploads/blogs");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err);
        });
      };

      if (Object.keys(files).includes("mobile_image")) {
        uploadMobileImage();
      }

      // saveToDB
      const {
        id: [id],
        model_type: [model_type],
        model: [model],
        status: [status],
        display_order: [display_order],
        url: [url],
        heading: [heading],
        text: [text],
      } = fields;

      let image_path = "";
      let mobile_image_path = "";

      if (fields.image) {
        image_path = fields.image[0];
      }

      if (fields.mobile_image) {
        mobile_image_path = fields.mobile_image[0];
      }

      const params = [
        model_type,
        model,
        status,
        display_order,
        savedPath.image ? savedPath.image : image_path,
        savedPath.mobile_image ? savedPath.mobile_image : mobile_image_path,
        url,
        heading,
        text,
        id,
      ];

      // // console.log(name);
      // console.log('fields', fields);

      try {
        const sql =
          "UPDATE `banners` SET `model_type`=?,`model`=?,`status`=?,`display_order`=?,`image`=?,`mobile_image`=?,`url`=?,`heading`=?,`text`=? WHERE `id`=?";
        const results = await query(sql, params);
        res.status(201).json({
          message: "Entry added",
          data: {
            ...fields,
            image: savedPath.image ? savedPath.image : image_path,
            mobile_image: savedPath.mobile_image
              ? savedPath.mobile_image
              : mobile_image_path,
          },
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error inserting data", error: error.message });
        // console.log(error.message);
      }
    });
  }

  // //update
  // else if (req.method === 'PUT') {

  //   const form = new formidable.IncomingForm();

  //   // // console.log('form', form);
  //   form.parse (req, async function (err, fields, files) {

  //     //// console.log('files', fields);
  //     let savedPath = {}

  //     const uploadImage = () => {

  //       const oldPath = files.image[0].filepath;
  //       const newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.image[0].originalFilename;
  //       const rawData = fs.readFileSync(oldPath);

  //       savedPath.image = 'uploads/blogs/' + files.image[0].originalFilename;

  //       const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

  //       if (!fs.existsSync(uploadDir)) {
  //         fs.mkdirSync(uploadDir, { recursive: true });
  //       }

  //       fs.writeFile(newPath, rawData, function (err) {
  //         if (err) console.log(err)
  //       })
  //     }

  //     if(Object.keys(files).includes('image')){
  //       uploadImage();
  //     }

  //     const uploadMobileImage = () => {

  //       const oldPath = files.mobile_image[0].filepath;
  //       const newPath = path.join(process.cwd(), 'public/uploads/blogs') + '/' + files.mobile_image[0].originalFilename;
  //       const rawData = fs.readFileSync(oldPath);

  //       savedPath.mobile_image = 'uploads/blogs/' + files.mobile_image[0].originalFilename;

  //       const uploadDir = path.join(process.cwd(), 'public/uploads/blogs');

  //       if (!fs.existsSync(uploadDir)) {
  //         fs.mkdirSync(uploadDir, { recursive: true });
  //       }

  //       fs.writeFile(newPath, rawData, function (err) {
  //         if (err) console.log(err)
  //       })
  //     }

  //     if(Object.keys(files).includes('mobile_image')){
  //       uploadMobileImage();
  //     }

  //     // saveToDB
  //     const {id: [id], name: [name], url: [url], model: [model], sitemap: [sitemap], schema: [schema], status: [status], title: [title], desc: [desc], faq_title: [faq_title], testimonial_title: [testimonial_title], content: [content] } = fields;

  //     let image_path = ''
  //     let cover_path = ''

  //     if(fields.image){
  //       image_path = fields.image[0];
  //     }

  //     if(fields.cover){
  //       cover_path = fields.cover[0];
  //     }

  //     const params = [name, url, model, sitemap, schema, status, savedPath.image ? savedPath.image : image_path, savedPath.cover ? savedPath.cover : cover_path, title, desc, faq_title, testimonial_title, content, id];

  //     // // console.log(name);
  //     // console.log('fields', fields);

  //     try {
  //       const sql = 'UPDATE `pages` SET `name`=?,`url`=?,`model`=?,`sitemap`=?,`schema`=?,`status`=?,`image`=?,`cover`=?,`title`=?,`desc`=?,`faq_title`=?,`testimonial_title`=?,`content`=? WHERE id=?'
  //       const results = await query(sql, params);
  //       res.status(201).json({ message: 'Entry added', data: req.body });
  //     } catch (error) {
  //       res.status(500).json({ message: 'Error inserting data', error: error.message });
  //       // console.log(error.message);
  //     }
  //   })
  // }
}
