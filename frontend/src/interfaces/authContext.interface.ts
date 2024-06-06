import { FormikHelpers, FormikValues } from 'formik';
import { IUserAuth } from './userAuth.interface';
import { LoginFormValues } from './login.interface';

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: IUserAuth | null;
  isLoading: boolean;
  login: (values: FormikValues, helpers: FormikHelpers<LoginFormValues>) => Promise<void>;
  logout: () => Promise<void>;
}
