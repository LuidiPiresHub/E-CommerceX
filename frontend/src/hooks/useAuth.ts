import { useEffect, useState } from 'react';
import api from '../axios/api';
import { IUserAuth } from '../interfaces/userAuth.interface';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | IUserAuth>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { message } } = await api.get('/user');
        setIsAuthenticated(true);
        setUserData(message);
      } catch {
        setIsAuthenticated(false);
        setUserData(null);
      }
    };
    fetchUser();
  }, []);

  const logout = async (): Promise<void> => {
    await api.post('/user/logout');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return { isAuthenticated, userData, logout };
}
