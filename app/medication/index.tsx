import TreatmentCard from 'components/card/TreatmentCard';
import Loader from 'components/iu/Loader';
import NotResults from 'components/iu/NoResults';
import { useFocusEffect } from 'expo-router';
import useApi from 'hooks/useApi';
import { useUser } from 'hooks/useUser';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TreatmentRecord } from 'schemas/TreatmentRecordSchema';

const IndexMedication = () => {
  const { user } = useUser();
  const { data, fetchData, error, loading } = useApi<TreatmentRecord[]>();

  useFocusEffect(
    useCallback(() => {
      if (user?.patientId) {
        fetchData(`/api/treatments/patient/${user.patientId}/all`, 'GET');
      }
    }, [user?.patientId])
  );

  if (loading || data === undefined) return <Loader />;

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error al cargar los tratamientos: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#ededed] p-4">
      {/*<View className="flex-row items-center justify-between py-4">
        <Text>Registra y monitoria tus tratamientos</Text>
        <AddButton onPress={() => router.push('/medication/new')} />
      </View> */}
      {(data || []).length === 0 ? (
        <NotResults label="No hay tratamientos registrados" />
      ) : (
        <FlatList
          data={data || []}
          renderItem={({ item }) => <TreatmentCard key={item.id} treatment={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default IndexMedication;
