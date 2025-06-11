import { FlatList, View } from 'react-native';

import { StateSymptom } from '../../../../components/badge/Badge';
import CardSymptom from '../../../../components/card/CardSymptom';

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
  return (
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
      contentContainerStyle={{ padding: 14 }} // Aplica estilos al contenedor interno de la FlatList
    />
  );
};

export default Index;
