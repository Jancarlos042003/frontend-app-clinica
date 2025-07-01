import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppointmentList from '../../components/home/AppointmentList';
import Notes from '../../components/home/Notes';
import MedicationList from '../../components/home/MedicationList';

const medicamentos = [
  { id: '1', nombre: 'Prednisona', hora: '8:00 PM', tomado: false },
  { id: '2', nombre: 'Ibuprofeno', hora: '7:00 AM', tomado: false },
  { id: '3', nombre: 'Amoxicilina', hora: '1:00 PM', tomado: false },
];

const Home = () => {
  const [notas, setNotas] = useState('• Dolor de cabeza.\n• Mareos.');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showAlarma, setShowAlarma] = useState(false);
  const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(medicamentos[0]);

  // Ejemplo de citas
  const citas = [
    {
      id: '1',
      especialidad: 'TRAUMATOLOGÍA',
      doctor: 'Dr. Juan Valdez',
      fecha: '29 - 06 - 2025',
      hora: '10:00 AM',
      lugar: 'Consultorio 1',
    },
    {
      id: '2',
      especialidad: 'PSICOLOGÍA',
      doctor: 'Dra. Karla Ramos',
      fecha: '29 - 06 - 2025',
      hora: '12:00 PM',
      lugar: 'Consultorio 2',
    },
    {
      id: '3',
      especialidad: 'MEDICINA GENERAL',
      doctor: 'Dr. Carlos Rivera',
      fecha: '29 - 06 - 2025',
      hora: '3:00 PM',
      lugar: 'Consultorio 3',
    },
  ];

  // Resultados clínicos de ejemplo
  const resultados = [
    { id: 1, nombre: 'Análisis de sangre' },
    { id: 2, nombre: 'Resultados de perfil lipídico' },
  ];

  // --- HANDLERS ---
  const handleGoToDetails = (cita) => {
    router.push({
      pathname: '/(tabs)/DetallesCita',
      params: { cita: JSON.stringify(cita) }
    });
  };

  const handleAlarmaPress = (med) => {
    setMedicamentoSeleccionado(med);
    setShowAlarma(true);
  };

  const handleVerResultado = (nombre) => {
    Alert.alert('Resultado', `Mostrando resultado de: ${nombre}`);
  };

  // --- RENDER ---
  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo-medi.png')} style={styles.logo} />
          <View style={{ flex: 1 }} />
          <View style={styles.userPhoto}>
            <Icon name="user" size={32} color="#0F172A" />
          </View>
        </View>
        <Text style={styles.name}>María Fernanda Jara Rivas</Text>
        <Text style={styles.dni}>DNI: 44223578</Text>

        {/* Próximas Citas */}
        <Text style={styles.sectionTitle}>Próximas Citas</Text>
        <AppointmentList citas={citas} onPressCita={handleGoToDetails} />

        {/* Próxima alarma */}
        <Text style={styles.sectionTitle}>Próxima alarma</Text>
        <MedicationList
          medicamentos={medicamentos}
          onPressMedicamento={handleAlarmaPress}
        />
        <Modal visible={showAlarma} transparent animationType="fade" onRequestClose={() => setShowAlarma(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Próxima alarma</Text>
              <Text>Medicamento: {medicamentoSeleccionado.nombre}</Text>
              <Text>Hora: {medicamentoSeleccionado.hora}</Text>
              <TouchableOpacity onPress={() => setShowAlarma(false)} style={styles.verBtn}>
                <Text style={styles.verBtnText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Notas */}
        <Text style={styles.sectionTitle}>Notas</Text>
        <View style={styles.notasCard}>
          <Text style={styles.notasText}>{notas}</Text>
          <TouchableOpacity onPress={() => setModoEdicion(true)} style={styles.lapizBtn}>
            <Icon name="pencil" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
        <Notes
          notas={notas}
          setNotas={setNotas}
          modoEdicion={modoEdicion}
          setModoEdicion={setModoEdicion}
        />

        {/* Últimos resultados clínicos */}
        <Text style={styles.sectionTitle}>Últimos resultados clínicos</Text>
        {resultados.map((r) => (
          <View key={r.id} style={styles.resultadoCard}>
            <Text style={styles.resultadoNombre}>{r.nombre}</Text>
            <TouchableOpacity style={styles.verBtn} onPress={() => handleVerResultado(r.nombre)}>
              <Text style={styles.verBtnText}>Ver</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 120 }} /> {/* Espacio extra para scroll */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#DDF6FF',
  },
  container: {
    padding: 20,
    paddingBottom: 140,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6F2FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'left',
  },
  dni: {
    color: '#0F172A',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 2,
    textAlign: 'left',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 18,
    color: '#0F172A',
  },
  citaCard: {
    backgroundColor: '#E6F2FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  citaEspecialidad: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 2,
  },
  citaDoctor: {
    fontSize: 15,
    color: '#222',
    marginBottom: 2,
  },
  citaFecha: {
    fontSize: 14,
    color: '#888',
  },
  alarmaCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  alarmaMedicamento: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F172A',
  },
  alarmaHora: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  notasCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  notasText: {
    fontSize: 15,
    color: '#222',
    flex: 1,
  },
  lapizBtn: {
    marginLeft: 10,
    padding: 6,
  },
  resultadoCard: {
    backgroundColor: '#E6F2FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  resultadoNombre: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  verBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  verBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default Home;