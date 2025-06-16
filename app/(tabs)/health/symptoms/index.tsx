import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { StateSymptom } from '../../../../components/badge/Badge';
import CardSymptom from '../../../../components/card/CardSymptom';
import { PlusCircleIcon } from '../../../../components/icons/icons';

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
    date: '2024-01-17',
    symptom: 'Fiebre',
    intensity: 'leve',
    notes: '38.2°C por la mañana, bajó durante el día',
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
  // Utilizamos useBottomTabBarHeight para obtener la altura del tabBar
  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Registra y monitorea tus síntomas</Text>
        <Pressable style={styles.addButton} onPress={() => router.push('/symptom/new')}>
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
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />} // Define un componente separador entre los elementos de la lista
        contentContainerStyle={{ paddingBottom: tabBarHeight }} // Aplica estilos al contenedor interno de la FlatList
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0f8',
    padding: 14,
  },
  headerRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    color: '#737373',
  },
  addButton: {
    borderRadius: 8,
    backgroundColor: '#32729F',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
