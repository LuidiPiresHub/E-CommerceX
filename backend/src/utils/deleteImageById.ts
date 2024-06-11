import fs from 'fs';
import path from 'path';

export const deleteImageById = async (id: string): Promise<void> => {
  const uploadDirectory = path.join(__dirname, '../../uploads');
  const userFiles = fs.readdirSync(uploadDirectory).filter(fileName => fileName.startsWith(id));
  userFiles.forEach((fileName) => fs.unlinkSync(path.join(uploadDirectory, fileName)));
};
