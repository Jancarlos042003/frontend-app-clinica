import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Button, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Notes from '../../components/home/Notes';
import MedicationList from '../../components/home/MedicationList';

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
  hora: string;
  lugar: string;
}

const Home = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    { id: '1', nombre: 'Colchicina', hora: '2:00 PM', tomado: false },
    { id: '2', nombre: 'Paracetamol', hora: '4:00 PM', tomado: false },
    { id: '3', nombre: 'Prednisona', hora: '8:00 PM', tomado: false },
  ]);
  const [notas, setNotas] = useState('• Dolor de cabeza.\n• Mareos.');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModal, setShowModal] = useState(false);  // Estado para mostrar el modal de SOS

  const toggleTomado = (id: string | number) => {
    setMedicamentos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, tomado: !m.tomado } : m))
    );
  };

  const eliminarMedicamento = (id: string | number) => {
    setMedicamentos((prev) => prev.filter((m) => m.id !== id));
  };

  const citas: Cita[] = [
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

  // Función para manejar la acción SOS
  const handleSOS = () => {
    setShowModal(true); 
  };

  const handleSendAlert = () => {
    Alert.alert('¡ALERTA ENVIADA!', 'Su ubicación ha sido enviada a la clínica, por favor mantenga la calma.');
    setShowModal(false); 
  };

  // Tipamos el hook de navegación para que reconozca la ruta y los parámetros
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  // Función para navegar a DetallesCita
  const handleGoToDetails = (cita: Cita) => {
    navigation.navigate('DetallesCita', { cita });
  };

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
      {citas.map((cita) => (
        <View key={cita.id}>
          <Text>
            {cita.especialidad} con {cita.doctor} - {cita.fecha} - {cita.hora}
          </Text>
          <Button title="Ver Detalles" onPress={() => handleGoToDetails(cita)} />
        </View>
      ))}

      <View style={styles.sosContainer}>
        <Icon name="bell" size={40} color="red" onPress={handleSOS} />
      </View>

      {/* Modal para la alerta SOS */}
      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="bell" size={50} color="red" />
            <Text style={styles.modalTitle}>SOS</Text>
            <Text style={styles.modalText}>¿Deseas enviar una alerta médica a la clínica?</Text>
            <Button title="ENVIAR ALERTA" onPress={handleSendAlert} color="red" />
            <Button title="Cancelar" onPress={() => setShowModal(false)} color="gray" />
          </View>
        </View>
      </Modal>
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
  sosContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: -25,
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
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;
