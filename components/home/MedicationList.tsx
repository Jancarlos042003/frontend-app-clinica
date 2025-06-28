import React from 'react';
import { View } from 'react-native';
import MedicationCard from './MedicationCard';

interface Medicamento {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
}

interface MedicationListProps {
  medicamentos: Medicamento[];
  toggleTomado: (id: string | number) => void;
  eliminarMedicamento: (id: string | number) => void;
}

const MedicationList: React.FC<MedicationListProps> = ({ medicamentos, toggleTomado, eliminarMedicamento }) => (
  <View>
    {medicamentos.map((medicamento) => (
      <MedicationCard
        key={medicamento.id}
        medicamento={medicamento}
        toggleTomado={toggleTomado}
        eliminarMedicamento={eliminarMedicamento}
      />
    ))}
  </View>
);

export default MedicationList;

