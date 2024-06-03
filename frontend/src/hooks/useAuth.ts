import { useEffect, useState } from 'react';
import api from '../axios/api';
import { IUserAuth } from '../interfaces/userAuth.interface';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | IUserAuth>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
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
    fetchUser();
  }, []);

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await api.post('/user/logout');
    setIsAuthenticated(false);
    setUserData(null);
    setIsLoading(false);
    navigate('/');
  };

  return { isAuthenticated, userData, logout, isLoading };
}
