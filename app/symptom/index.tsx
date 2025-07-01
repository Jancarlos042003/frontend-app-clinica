import { useFocusEffect } from '@react-navigation/native';
import AddButton from 'components/buttons/AddButton';
import { useRouter } from 'expo-router';
import useApi from 'hooks/useApi';
import { useUser } from 'hooks/useUser';
import { useEffect, useCallback } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Loader from 'components/iu/Loader';
import SymptomList from '~/components/lists/SymptomList';
import { Symptom } from '~/types/symptom';

const Index = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Obtiene los insets de la zona segura para ajustar el padding inferior
  const { data, error, loading, fetchData } = useApi<Symptom[]>();
  const { user } = useUser();

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

  // Carga los síntomas al montar el componente
  if (loading || data === undefined) return <Loader />;

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
      <View className="flex-row items-center justify-between pt-4">
        <Text className="text-lg text-gray-500">Registra y monitorea tus síntomas</Text>
        <AddButton onPress={() => router.push('/symptom/new')} />
      </View>
      <SymptomList data={data || []} title={false} />
    </View>
  );
};

export default Index;
