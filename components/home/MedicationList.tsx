
import React from 'react';
import { View } from 'react-native';
import MedicationCard from './MedicationCard';

type Medicamento = {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
  [key: string]: any;
};

type MedicationListProps = {
  medicamentos: Medicamento[];
  toggleTomado: (id: Medicamento['id']) => void;
  eliminarMedicamento: (id: Medicamento['id']) => void;
};

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
