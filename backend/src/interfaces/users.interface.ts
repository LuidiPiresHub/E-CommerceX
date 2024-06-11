import { HttpStatus } from '../utils/mapStatus';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  username: string;
}

export interface IUserData {
  id: string;
  email: string;
  username: string;
  phoneNumber: string | null;
  gender: string | null;
  birthdate: Date | null;
  profileImg: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface IUserService {
  type: keyof typeof HttpStatus
  message: string;
}
