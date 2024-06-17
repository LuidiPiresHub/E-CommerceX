import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const TEN_MB = 1024 * 1024 * 10;

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Arquivo não é uma imagem!'));
  }
};

export const upload = multer({
  fileFilter: fileFilter,
  limits: { fileSize: TEN_MB },
  storage: multer.memoryStorage(),
});
