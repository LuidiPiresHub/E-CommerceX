import { Request, Response, NextFunction } from 'express';

const validateSearchParams = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;
  if (!name || !(name as string).trim()) {
    return res.status(400).json({ message: 'Empty search query' });
  }
  return next();
};

export default validateSearchParams;
