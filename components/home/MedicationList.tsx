import React from 'react';
import { View } from 'react-native';
import MedicationCard from './MedicationCard';

interface Medicamento {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
}

interface Props {
  medicamentos: Medicamento[];
  onPressMedicamento: (medicamento: Medicamento) => void;
}

const MedicationList: React.FC<Props> = ({ medicamentos, onPressMedicamento }) => (
  <View>
    {medicamentos.map((med) => (
      <MedicationCard key={med.id} medicamento={med} onPress={() => onPressMedicamento(med)} />
    ))}
  </View>
);

export default MedicationList;