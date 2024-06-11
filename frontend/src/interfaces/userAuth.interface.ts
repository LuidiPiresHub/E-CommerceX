export interface IUserAuth {
  id: number;
  username: string;
  email: string;
  profileImg: string | null;
  gender: string | null;
  phoneNumber: string | null;
  birthdate: Date | string | null;
}
