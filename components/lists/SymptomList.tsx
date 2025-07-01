import { View, Text, FlatList } from 'react-native';
import { Symptom } from '~/types/symptom';
import SymptomInfoCard from '../card/SymptomInfoCard';

type SymptomListProps = {
  data: Symptom[];
};

const SymptomList = ({ data }: SymptomListProps) => {
  return (
    <View className="mt-4">
      <Text className="mb-2 text-lg font-bold text-[#0F172A]">Síntomas del día</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <SymptomInfoCard symptom={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text className="text-gray-500">No hay síntomas registrados para hoy.</Text>
      )}
    </View>
  );
};

export default SymptomList;
