import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import useApi from '~/hooks/useApi';
import { useUser } from '~/hooks/useUser';
import { Symptom } from '~/types/symptom';

interface SymptomContextProps {
  todaysSymptoms: Symptom[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addSymptom: (symptom: Symptom) => void;
}

const SymptomContext = createContext<SymptomContextProps>({
  todaysSymptoms: [],
  loading: false,
  error: null,
  refetch: () => {}, // Para volver a obtener los síntomas
  addSymptom: () => {}, // Para agregar un nuevo síntoma
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
    if (!user?.patientId) return;
    try {
      const data = await fetchData(
        `/api/symptom-diary/patient/${user.patientId}/todays-registered-symptoms`,
        'GET'
      );
      console.log('Síntomas del día:', data);
      setTodaysSymptoms(data || []);
    } catch (e) {
      console.error('Error fetching symptoms:', e);
      setTodaysSymptoms([]);
    }
  };

  const addSymptom = (symptom: Symptom) => {
    setTodaysSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
  };

  useEffect(() => {
    getSymptoms();
  }, [user?.patientId]);

  return (
    <SymptomContext.Provider
      value={{ todaysSymptoms, loading, error, refetch: getSymptoms, addSymptom }}>
      {children}
    </SymptomContext.Provider>
  );
};
