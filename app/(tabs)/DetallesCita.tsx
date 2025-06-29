import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';

interface Props {
  route: RouteProp<RootStackParamList, 'DetallesCita'>;
}

const DetallesCita: React.FC<Props> = ({ route }) => {
  const { cita } = route.params;

  const handleAccion = (accion: string) => {
    let mensaje = '';
    if (accion === 'asistire') mensaje = '¡Has confirmado tu asistencia!';
    if (accion === 'noasistire') mensaje = 'Has indicado que no asistirás.';
    if (accion === 'reprogramar') mensaje = 'Solicitud de reprogramación enviada.';
    Alert.alert('Cita', mensaje);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cita.especialidad}</Text>
      <Text style={styles.label}>Doctor: <Text style={styles.value}>{cita.doctor}</Text></Text>
      <Text style={styles.label}>Fecha: <Text style={styles.value}>{cita.fecha}</Text></Text>
      <Text style={styles.label}>Hora: <Text style={styles.value}>{cita.hora}</Text></Text>
      <Text style={styles.label}>Lugar: <Text style={styles.value}>{cita.lugar}</Text></Text>
      <View style={styles.btns}>
        <TouchableOpacity style={[styles.btn, styles.btnAsistire]} onPress={() => handleAccion('asistire')}>
          <Text style={styles.btnText}>Asistiré</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnNoAsistire]} onPress={() => handleAccion('noasistire')}>
          <Text style={styles.btnText}>No asistiré</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnReprogramar]} onPress={() => handleAccion('reprogramar')}>
          <Text style={styles.btnText}>Reprogramar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} /> {/* Espacio extra para scroll */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, backgroundColor: '#E6F2FA', paddingBottom: 80 },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 20, color: '#0F172A' },
  label: { fontSize: 16, color: '#0F172A', marginBottom: 6 },
  value: { fontWeight: 'bold', color: '#222' },
  btns: { marginTop: 30, gap: 12 },
  btn: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnAsistire: {
    backgroundColor: '#0F172A',
  },
  btnNoAsistire: {
    backgroundColor: '#E57373',
  },
  btnReprogramar: {
    backgroundColor: '#1976D2',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DetallesCita;