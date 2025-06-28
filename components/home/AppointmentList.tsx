import React from 'react';
import { View } from 'react-native';
import AppointmentCard from './AppointmentCard';

interface Cita {
  id: string | number;
  especialidad: string;
  doctor: string;
  fecha: string;
}

interface AppointmentListProps {
  citas: Cita[];  
}

const AppointmentList: React.FC<AppointmentListProps> = ({ citas }) => (
  <View>
    {citas.map((cita) => (
      <AppointmentCard key={cita.id} cita={cita} />
    ))}
  </View>
);

export default AppointmentList;

