import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { getAccessToken } from '../auth/tokenService';
import { API_URL } from '../config/env';

type Props = {
  children: ReactNode;
};

export type User = {
  name: string;
  lastname: string;
  dni: string;
  birthday: Date;
  phone: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = await getAccessToken();

      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/auth/user`);
          console.log(response); // <-- eliminar
          const data = await response.json(); // <-- importante
          setUser(data);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUser(null);
        }
      }
    };

    loadUser(); // Ejecutamos loadUser()
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
