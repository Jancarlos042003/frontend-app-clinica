// src/components/home/AppointmentCard.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export type Cita = {
  id: string | number;
  especialidad: string;
  doctor: string;
  fecha: string;
};

interface AppointmentCardProps {
  cita: Cita;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ cita }) => (
  <TouchableOpacity style={styles.card} onPress={() => alert(`Detalle de cita: ${cita.especialidad} con ${cita.doctor}`)}>
    <Text style={styles.specialty}>{cita.especialidad}</Text>
    <Text style={styles.doctor}>{cita.doctor}</Text>
    <Text style={styles.date}>{cita.fecha}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  specialty: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  doctor: {
    color: '#555',
  },
  date: {
    color: '#777',
  },
});

export default AppointmentCard; 

