import streamifier from "streamifier";
import cloudinary from "./cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "banners",
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error);
          return;
        }

        resolve(result.secure_url);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
