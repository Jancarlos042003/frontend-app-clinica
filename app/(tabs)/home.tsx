import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Notes from '../../components/home/Notes';
import MedicationList from '../../components/home/MedicationList';
import AppointmentList from '../../components/home/AppointmentList';

interface Medicamento {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
}

interface Cita {
  id: string | number;
  especialidad: string;
  doctor: string;
  fecha: string;
}

const Home = () => { 
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { id: '1', nombre: 'Colchicina', hora: '2:00 PM', tomado: false },
    { id: '2', nombre: 'Paracetamol', hora: '4:00 PM', tomado: false },
    { id: '3', nombre: 'Prednisona', hora: '8:00 PM', tomado: false },
  ]);
  const [notas, setNotas] = useState('• Dolor de cabeza.\n• Mareos.');
  const [modoEdicion, setModoEdicion] = useState(false);

  const toggleTomado = (id: string | number) => {
    setMedicamentos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, tomado: !m.tomado } : m))
    );
  };

  const eliminarMedicamento = (id: string | number) => {
    setMedicamentos((prev) => prev.filter((m) => m.id !== id));
  };

  const citas: Cita[] = [
    { id: '1', especialidad: 'TRAUMATOLOGÍA', doctor: 'Dr. Juan Valdez', fecha: '29 - 06 - 2025' },
    { id: '2', especialidad: 'PSICOLOGÍA', doctor: 'Dra. Karla Ramos', fecha: '29 - 06 - 2025' },
    { id: '3', especialidad: 'MEDICINA GENERAL', doctor: 'Dr. Carlos Rivera', fecha: '29 - 06 - 2025' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo-medi.png')} style={styles.logo} />
        <Text style={styles.name}>María Fernanda Jara Rivas</Text>
      </View>

      <Notes notas={notas} setNotas={setNotas} modoEdicion={modoEdicion} setModoEdicion={setModoEdicion} />

      <Text style={styles.sectionTitle}>Medicamentos</Text>
      <MedicationList
        medicamentos={medicamentos}
        toggleTomado={toggleTomado}
        eliminarMedicamento={eliminarMedicamento}
      />

      <Text style={styles.sectionTitle}>Próximas Citas</Text>
      <AppointmentList citas={citas} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C5F0FF33',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 50,
  },
  name: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Home; 
