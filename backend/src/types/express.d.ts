import { TokenData } from '../interfaces/jwt.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: TokenData;
  }
}
