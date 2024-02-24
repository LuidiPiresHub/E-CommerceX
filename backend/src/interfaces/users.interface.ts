import { HttpStatus } from '../utils/mapStatus';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
}

export interface IUserUpdateProfile {
  id: string;
  name: string;
  profileImage: string;
}

export interface IUserService {
  type: keyof typeof HttpStatus
  message: string;
}
