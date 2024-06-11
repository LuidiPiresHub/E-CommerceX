import fs from 'fs';
import path from 'path';

export const deleteImageById = async (id: string): Promise<void> => {
  const uploadDirectory = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }
  const userFiles = fs.readdirSync(uploadDirectory).filter(fileName => fileName.startsWith(id));
  userFiles.forEach((fileName) => fs.unlinkSync(path.join(uploadDirectory, fileName)));

  const remainingFiles = fs.readdirSync(uploadDirectory);
  if (!remainingFiles.length) fs.rmdirSync(uploadDirectory);
};
