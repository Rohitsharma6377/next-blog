import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath) => {
  const fullPath = path.join(process.cwd(), "public/", filePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      // console.log(`Deleted: ${fullPath}`);
    } else {
      // console.log(`File not found: ${fullPath}`);
    }
  } catch (error) {
    // console.error(`Error deleting file: ${error.message}`);
  }
};

export default deleteFile;