import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
import { deleteImageById } from '../utils/deleteImageById';

const TEN_MB = 1024 * 1024 * 10;

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    const { id } = req.user;
    deleteImageById(id);
    cb(null, true);
  } else {
    cb(new Error('Arquivo não é uma imagem!'));
  }
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const uploadDirectory = path.join(__dirname, '../../uploads');
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const { id } = req.user;
    const ext = path.extname(file.originalname);
    cb(null, `${id}${ext}`);
  },
});

export const upload = multer({
  fileFilter: fileFilter,
  limits: { fileSize: TEN_MB },
  storage: storage,
});
