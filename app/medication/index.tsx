import AddButton from 'components/buttons/AddButton';
import TreatmentCard from 'components/card/TreatmentCard';
import Loader from 'components/iu/Loader';
import NotResults from 'components/iu/NoResults';
import { useFocusEffect, useRouter } from 'expo-router';
import useApi from 'hooks/useApi';
import { useUser } from 'hooks/useUser';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TreatmentRecord } from 'schemas/TreatmentRecordSchema';

const IndexMedication = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, fetchData, error, loading } = useApi<TreatmentRecord[]>();
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (user?.dni) {
        fetchData(`/api/treatments/patient/${user.dni}/all`, 'GET');
      }
    }, [user?.dni])
  );

  useEffect(() => {
    if (data) {
      setTreatments(data);
    }
  }, [data]);

  if (loading) return <Loader />;

  return (
    <View className="flex-1 bg-primary_100 px-4">
      <View className="flex-row items-center justify-between py-4">
        <Text>Registra y monitoria tus tratamientos</Text>
        <AddButton onPress={() => router.push('/medication/new')} />
      </View>
      {treatments.length === 0 ? (
        <NotResults label="No hay tratamientos registrados" />
      ) : (
        <FlatList
          data={treatments}
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
