import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import useApi from '~/hooks/useApi';
import { useUser } from '~/hooks/useUser';
import { Medication } from '~/types/medication';

type MedicationContextType = {
  todaysMedications: Medication[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addMedication: (medication: Medication) => void;
};

const MedicationContext = createContext<MedicationContextType>({
  todaysMedications: [],
  loading: false,
  error: null,
  refetch: () => {},
  addMedication: () => {},
});

interface MedicationProviderProps {
  children: ReactNode;
}

export const MedicationProvider = ({ children }: MedicationProviderProps) => {
  const { user } = useUser();
  const { fetchData } = useApi();
  const [todaysMedications, setTodaysMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMedications = async () => {
    if (!user?.patientId) return;
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const startDate = today.toISOString().slice(0, 10);
      const endDate = startDate;
      const data = await fetchData(
        `/api/medications/range/${user.patientId}?startDate=${startDate}&endDate=${endDate}`,
        'GET'
      );

      if (Array.isArray(data)) {
        setTodaysMedications(data);
      } else {
        setTodaysMedications([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Error al obtener medicamentos');
    } finally {
      setLoading(false);
    }
  };

  const addMedication = (medication: Medication) => {
    setTodaysMedications((prevMedications) => [...prevMedications, medication]);
  };

  useEffect(() => {
    fetchMedications();
  }, [user]);

  return (
    <MedicationContext.Provider
      value={{ todaysMedications, loading, error, refetch: fetchMedications, addMedication }}>
      {children}
    </MedicationContext.Provider>
  );
};

export const useMedicationContext = () => useContext(MedicationContext);
