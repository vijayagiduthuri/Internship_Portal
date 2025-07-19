// 📁 utils/uploadToCloudinary.js
import { v2 as cloudinary } from 'cloudinary';

export const uploadToCloudinary = (fileBuffer, folderName = "company-logos") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer); // Send file buffer
  });
};
