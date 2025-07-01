import { View, Text, FlatList } from 'react-native';
import { Symptom } from '~/types/symptom';
import SymptomInfoCard from '../card/SymptomInfoCard';
import EmptyStateCard from '../card/EmptyStateCard';
import { useRouter } from 'expo-router';

type SymptomListProps = {
  data: Symptom[];
  scrollEnabled?: boolean;
  title?: boolean;
  [key: string]: any;
};

const SymptomList = ({
  data,
  scrollEnabled = true,
  title = true,
  ...otherProps
}: SymptomListProps) => {
  const router = useRouter();

  return (
    <View className="mt-4">
      {title && <Text className="mb-2 text-lg font-bold text-[#0F172A]">Síntomas del día</Text>}
      {data.length > 0 ? (
        scrollEnabled ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <SymptomInfoCard symptom={item} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            {...otherProps}
          />
        ) : (
          <View>
            {data.map((item, index) => (
              <View key={item.id || index} style={{ marginBottom: 3 }}>
                <SymptomInfoCard symptom={item} />
              </View>
            ))}
          </View>
        )
      ) : (
        <EmptyStateCard
          title="No hay síntomas registrados"
          description="Agrega un síntoma para comenzar a llevar un seguimiento de tu salud."
          buttonLabel="Agregar Síntoma"
          onAdd={() => router.push('/symptom/new')}
        />
      )}
    </View>
  );
};

export default SymptomList;
