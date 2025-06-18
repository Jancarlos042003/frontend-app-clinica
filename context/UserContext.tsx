import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import { API_URL } from '../config/env';

type Props = {
  children: ReactNode;
};

export type User = {
  name: string;
  lastname: string;
  dni: string;
  birthDate: Date;
  phone: string | null;
  email: string | null;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  loginUser: (token: string) => void; // Optional method for login
};

// Creamos el contexto de usuario
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  loginUser: () => {},
});

// Componente proveedor del contexto de usuario
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json(); // <-- importante
            setUser(data);
          } else {
            console.error('Error al obtener los datos del usuario:', response.status);
            setUser(null);
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser(); // Ejecutamos loadUser()
  }, [token]);

  const loginUser = (newToken: string) => {
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
