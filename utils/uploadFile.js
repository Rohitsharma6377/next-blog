const formidable = require('formidable');
import { exec } from "child_process";
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Reusable function to upload file
export async function uploadFile({ file, uploadDir, fileName }) {
  const filename = `${fileName}-${Math.round(Math.random() * 1000)}${path.extname(file.originalFilename)}`;
  const oldPath = file.filepath;
  const filePath = path.join(process.cwd(), `public/${uploadDir}`, filename);

  // Ensure upload directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // Read and write file
  const rawData = await fs.readFileSync(oldPath);
  await fs.writeFileSync(filePath, rawData);

  // Change file ownership
  // exec(`chown -R www-data:www-data /var/www/amitkkae/public/uploads`, (error) => {
  //   if (error) {
  //     console.error(`Failed to change file ownership: ${error.message}`);
  //     return error;
  //   }
  // });

  return { fileUrl: `${uploadDir}/${filename}`, fileName: filename }; // Return the relative path to the file
}


// const formidable = require('formidable');
// import { exec } from "child_process";
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Reusable function to upload file
// export async function uploadFile({ file, uploadDir, fileName }) {
//   const filename = `${fileName}-${Math.round(Math.random() * 1000)}${path.extname(file.originalFilename)}`;
//   const oldPath = file.filepath;
//   const filePath = path.join(process.cwd(), `public/${uploadDir}`, filename);

//   // Ensure upload directory exists
//   if (!fs.existsSync(path.dirname(filePath))) {
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   }

//   // Read and write file
//   const rawData = await fs.readFileSync(oldPath);
//   await fs.writeFileSync(filePath, rawData);

//   exec(`chown www-data:www-data ${filePath}`, (error) => {
//     if (error) {
//       console.error(`Failed to change file ownership: ${error.message}`);
//       return error;
//     }
//   });

//   return {fileUrl: `${uploadDir}/${filename}`, fileName: filename}; // Return the relative path to the file
// }