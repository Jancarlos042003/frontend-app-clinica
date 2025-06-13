
import React from 'react';
import { View } from 'react-native';
import AppointmentCard from './AppointmentCard'; // Importa el componente AppointmentCard
import type { Cita } from './AppointmentCard'; // Importamos solo el tipo 'Cita'

interface AppointmentListProps {
  citas: Cita[]; // Usamos el tipo 'Cita' en lugar de usar la interface directamente
}

const AppointmentList: React.FC<AppointmentListProps> = ({ citas }) => (
  <View>
    {citas.map((cita) => (
      <AppointmentCard key={cita.id} cita={cita} />
    ))}
  </View>
);

export default AppointmentList;

