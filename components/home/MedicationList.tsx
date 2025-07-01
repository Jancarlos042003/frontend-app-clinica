import { View, FlatList, Text } from 'react-native';
import MedicationCard from './MedicationCard';
import { Medication } from '~/types/medication';

interface MedicationListProps {
  medications: Medication[];
}

const MedicationList = ({ medications }: MedicationListProps) => (
  <View className="flex-1">
    <Text className="mb-2 text-lg font-bold text-[#0F172A]">Próximos Medicamentos</Text>
    {medications.length > 0 ? (
      <FlatList
        data={medications}
        keyExtractor={(item) => item.medicationId.toString()}
        renderItem={({ item }) => <MedicationCard medication={item} />}
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    ) : (
      <Text className="text-gray-500">No hay medicamentos programados para hoy.</Text>
    )}
  </View>
);

export default MedicationList;
