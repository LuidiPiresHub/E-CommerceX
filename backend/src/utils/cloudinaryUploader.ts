import { UploadApiOptions } from 'cloudinary';
import cloudinary from '../config/cloudinary';
import stream from 'stream';

export const cloudinaryUploader = async (userId: string, buffer?: Buffer): Promise<string | null> => {
  if (!buffer) {
    await cloudinary.uploader.destroy(userId);
    return null;
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  const cloudinaryConfig: UploadApiOptions = {
    public_id: userId,
    overwrite: true,
    resource_type: 'image'
  };

  return new Promise((resolve, reject) => {
    bufferStream.pipe(cloudinary.uploader.upload_stream(cloudinaryConfig, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result?.secure_url || null);
      }
    }));
  });
};
