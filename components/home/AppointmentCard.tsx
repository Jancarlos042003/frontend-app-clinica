import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppointmentCard = ({ cita, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <View>
      <Text style={styles.especialidad}>{cita.especialidad}</Text>
      <Text style={styles.doctor}>{cita.doctor}</Text>
      <Text style={styles.fecha}>{cita.fecha}</Text>
    </View>
    <Icon name="chevron-right" size={22} color="#0F172A" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E6F2FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  especialidad: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 2,
  },
  doctor: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  fecha: {
    fontSize: 14,
    color: '#888',
  },
});

export default AppointmentCard;