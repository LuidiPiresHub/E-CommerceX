import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../axios/api';
import { AuthContextType } from '../interfaces/authContext.interface';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUserAuth } from '../interfaces/userAuth.interface';
import { FormikHelpers, FormikValues } from 'formik';
import { LoginFormValues } from '../interfaces/login.interface';
import { RegisterFormValues } from '../interfaces/register.interface';
import { IBackendResponseError } from '../interfaces/server.interface';
import Swal from 'sweetalert2';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | IUserAuth>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { state } = useLocation();
  const from = state?.from?.pathname || '/';

  const fetchUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { data: { message } } = await api.get('/user');
      setIsAuthenticated(true);
      setUserData(message);
    } catch {
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (values: FormikValues, { resetForm }: FormikHelpers<LoginFormValues>): Promise<void> => {
    try {
      setIsLoading(true);
      await api.post('/user/login', { userData: values });
      await fetchUser();
      resetForm();
      navigate(from);
    } catch (error) {
      const errorMessage = (error as IBackendResponseError).response?.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Ocorreu um erro interno',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (values: FormikValues, { resetForm }: FormikHelpers<RegisterFormValues>): Promise<void> => {
    try {
      setIsLoading(true);
      await api.post('/user/register', { userData: values });
      await fetchUser();
      resetForm();
      navigate(from);
    } catch (error) {
      const errorMessage = (error as IBackendResponseError).response?.data.message;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Ocorreu um erro interno',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await api.post('/user/logout');
    setIsAuthenticated(false);
    setUserData(null);
    setIsLoading(false);
    navigate('/');
  };
  
  useEffect(() => {
    fetchUser();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
