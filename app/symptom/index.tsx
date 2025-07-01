import { useFocusEffect } from '@react-navigation/native';
import AddButton from 'components/buttons/AddButton';
import { useRouter } from 'expo-router';
import useApi from 'hooks/useApi';
import { useUser } from 'hooks/useUser';
import { useEffect, useState, useCallback } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CardSymptom from '../../components/card/CardSymptom';
import { StateSymptom } from '../../constants/constants';
import Loader from 'components/iu/Loader';
import NotResults from 'components/iu/NoResults';

type Symptom = {
  id: number;
  date: string;
  symptom: string;
  intensity: StateSymptom;
  notes: string;
};

const Index = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Obtiene los insets de la zona segura para ajustar el padding inferior
  const { data, error, loading, fetchData, clearError } = useApi<Symptom[]>();
  const { user } = useUser();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#32729F');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (user?.dni) {
        fetchData(`/api/symptom-diary/patient/${user.dni}`, 'GET');
      }
    }, [user?.dni])
  );

  useEffect(() => {
    if (data) {
      setSymptoms(data);
    }
  }, [data]);

  // Carga los síntomas al montar el componente
  if (loading) return <Loader />;

  // Si hay un error al cargar los síntomas, muestra un mensaje de error
  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error al cargar los síntomas: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary_100 px-4" style={{ paddingBottom: insets.bottom + 16 }}>
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-lg text-gray-500">Registra y monitorea tus síntomas</Text>
        <AddButton onPress={() => router.push('/symptom/new')} />
      </View>
      {symptoms.length > 0 ? (
        <FlatList
          data={symptoms}
          renderItem={({ item }) => (
            <CardSymptom
              symptom={item.symptom}
              date={item.date}
              intensity={item.intensity}
              notes={item.notes}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // Define un componente separador entre los elementos de la lista
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <NotResults label="No hay síntomas registrados" />
      )}
    </View>
  );
};

export default Index;
