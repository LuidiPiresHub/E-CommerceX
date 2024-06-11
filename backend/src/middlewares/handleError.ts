import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err instanceof MulterError) {
    return res.status(400).json({ type: err.message, message: 'Erro ao fazer upload do arquivo'});
  }
  return res.status(500).json({ type: err.name, message: err.message });
};

export default handleError;
