import React from 'react';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({ citas, onPressCita }) => (
  <>
    {citas.map((cita) => (
      <AppointmentCard key={cita.id} cita={cita} onPress={() => onPressCita(cita)} />
    ))}
  </>
);

export default AppointmentList;