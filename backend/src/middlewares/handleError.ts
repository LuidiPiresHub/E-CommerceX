import { Request, Response, NextFunction } from 'express';

const handleError = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ type: err.name, message: err.message });
};

export default handleError;
