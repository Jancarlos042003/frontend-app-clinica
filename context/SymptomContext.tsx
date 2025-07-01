import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import useApi from '~/hooks/useApi';
import { useUser } from '~/hooks/useUser';

export type Symptom = {
  id: string;
  date: string;
  symptom: string;
  intensity: string;
  notes: string;
};

interface SymptomContextProps {
  todaysSymptoms: Symptom[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const SymptomContext = createContext<SymptomContextProps>({
  todaysSymptoms: [],
  loading: false,
  error: null,
  refetch: () => {}, // Para volver a obtener los síntomas
});

// Creamos el contexto
export const useSymptomContext = () => useContext(SymptomContext);

// Proveedor del contexto
export const SymptomProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const { fetchData, loading, error } = useApi<Symptom[]>();
  const [todaysSymptoms, setTodaysSymptoms] = useState<Symptom[]>([]);

  // Función para obtener los síntomas del día
  const getSymptoms = async () => {
    if (!user?.dni) return;
    try {
      const data = await fetchData(`/api/symptom-diary/patient/${user.dni}/todays-symptoms`, 'GET');
      setTodaysSymptoms(data || []);
    } catch (e) {
      console.error('Error fetching symptoms:', e);
      setTodaysSymptoms([]);
    }
  };

  useEffect(() => {
    getSymptoms();
  }, [user?.dni]);

  return (
    <SymptomContext.Provider value={{ todaysSymptoms, loading, error, refetch: getSymptoms }}>
      {children}
    </SymptomContext.Provider>
  );
};
