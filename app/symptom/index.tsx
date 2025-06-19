import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, Pressable, StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StateSymptom } from '../../components/badge/Badge';
import CardSymptom from '../../components/card/CardSymptom';
import { PlusCircleIcon } from '../../components/icons/icons';

type Symptom = {
  id: number;
  date: string;
  symptom: string;
  intensity: StateSymptom;
  notes: string;
};
const SYMPTOMS: Symptom[] = [
  {
    id: 1,
    date: '2024-01-18',
    symptom: 'Dolor de cabeza',
    intensity: 'moderado',
    notes: 'Dolor en la zona frontal, mejoró después de medicamento',
  },
  {
    id: 2,
    notes: '38.2°C por la mañana, bajó durante el día',
    date: '2024-01-17',
    symptom: 'Fiebre',
    intensity: 'leve',
  },
  {
    id: 3,
    date: '2024-01-16',
    symptom: 'Fatiga',
    intensity: 'severo',
    notes: 'Cansancio extremo, dificultad para realizar actividades',
  },
  {
    id: 4,
    date: '2024-01-18',
    symptom: 'Dolor de cabeza',
    intensity: 'moderado',
    notes: 'Dolor en la zona frontal, mejoró después de medicamento',
  },
  {
    id: 5,
    date: '2024-01-17',
    symptom: 'Fiebre',
    intensity: 'leve',
    notes: '38.2°C por la mañana, bajó durante el día',
  },
  {
    id: 6,
    date: '2024-01-16',
    symptom: 'Fatiga',
    intensity: 'severo',
    notes: 'Cansancio extremo, dificultad para realizar actividades',
  },
];

const Index = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets(); // Obtiene los insets de la zona segura para ajustar el padding inferior

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor('#32729F');
  }, []);

  return (
    <View className="flex-1 px-4" style={{ paddingBottom: insets.bottom + 16 }}>
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-lg text-gray-500">Registra y monitorea tus síntomas</Text>
        <Pressable
          className="rounded bg-primary px-3 py-2"
          onPress={() => router.push('/symptom/new')}>
          <PlusCircleIcon color="#fff" size={24} />
        </Pressable>
      </View>
      <FlatList
        data={SYMPTOMS}
        renderItem={({ item }) => (
          <CardSymptom
            symptom={item.symptom}
            date={item.date}
            intensity={item.intensity}
            notes={item.notes}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />} // Define un componente separador entre los elementos de la lista
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Index;
