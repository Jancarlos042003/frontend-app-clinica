import { useContext } from 'react';

import { UserContext } from '../context/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context == null) {
    throw new Error('useUser debe ser usado dentro de UserProvider');
  }

  return context;
};
