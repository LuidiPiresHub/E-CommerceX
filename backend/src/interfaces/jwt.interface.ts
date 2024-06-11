import { IUserData } from './users.interface';

export interface TokenData extends IUserData {
  iat: number;
  exp: number;
}
