import { View, FlatList, Text } from 'react-native';
import MedicationCard from '../card/MedicationCard';
import { Medication } from '~/types/medication';
import EmptyStateCard from '../card/EmptyStateCard';
import { useRouter } from 'expo-router';

interface MedicationListProps {
  medications: Medication[];
  scrollEnabled?: boolean;
  [key: string]: any;
}

const MedicationList = ({
  medications,
  scrollEnabled = true,
  ...otherProps
}: MedicationListProps) => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text className="mb-2 text-lg font-bold text-[#0F172A]">Próximos Medicamentos</Text>
      {medications.length > 0 ? (
        scrollEnabled ? (
          <FlatList
            data={medications}
            keyExtractor={(item) => item.medicationId.toString()}
            renderItem={({ item }) => <MedicationCard medication={item} />}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            {...otherProps}
          />
        ) : (
          <View>
            {medications.map((item, index) => (
              <View key={item.medicationId || index} style={{ marginBottom: 10 }}>
                <MedicationCard medication={item} />
              </View>
            ))}
          </View>
        )
      ) : (
        <EmptyStateCard
          title="No hay medicamentos programados"
          description="Actualmente no tienes medicamentos programados para hoy."
        />
      )}
    </View>
  );
};

export default MedicationList;
