import { ScrollView, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import { router } from 'expo-router';
import AppointmentList from '../../components/home/AppointmentList';
import MedicationList from '../../components/home/MedicationList';
import { useSymptomContext } from '~/context/SymptomContext';
import SymptomList from '~/components/lists/SymptomList';
import { useMedicationContext } from '~/context/MedicationContext';

const Home = () => {
  const { todaysMedications } = useMedicationContext();
  const { todaysSymptoms } = useSymptomContext();

  // Ejemplo de citas
  const citas = [
    {
      id: '1',
      especialidad: 'TRAUMATOLOGÍA',
      doctor: 'Dr. Juan Valdez',
      fecha: '29 - 06 - 2025',
      hora: '10:00',
      lugar: 'Consultorio 1',
    },
    {
      id: '2',
      especialidad: 'PSICOLOGÍA',
      doctor: 'Dra. Karla Ramos',
      fecha: '29 - 06 - 2025',
      hora: '12:00',
      lugar: 'Consultorio 2',
    },
    {
      id: '3',
      especialidad: 'MEDICINA GENERAL',
      doctor: 'Dr. Carlos Rivera',
      fecha: '29 - 06 - 2025',
      hora: '15:00',
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
      params: { cita: JSON.stringify(cita) },
    });
  };

  const handleVerResultado = (nombre) => {
    Alert.alert('Resultado', `Mostrando resultado de: ${nombre}`);
  };

  // --- RENDER ---
  return (
    <View className="bg-[#d9eff4]]">
      <ScrollView className="p-5 pb-20" showsVerticalScrollIndicator>
        {/* Próximas Citas */}
        <Text className="mb-2 mt-4 text-lg font-bold text-[#0F172A]">Próximas Citas</Text>
        <AppointmentList citas={citas} onPressCita={handleGoToDetails} />
        {/* Próxima alarma */}
        <MedicationList medications={todaysMedications} />
        <SymptomList data={todaysSymptoms} />
        {/* Últimos resultados clínicos */}
        <Text className="mb-2 mt-4 text-lg font-bold text-[#0F172A]">
          Últimos resultados clínicos
        </Text>
        {resultados.map((r) => (
          <View
            key={r.id}
            className="mb-3 flex-row items-center justify-between rounded-xl bg-[#E6F2FA] p-4 shadow-sm">
            <Text className="text-base font-bold text-[#0F172A]">{r.nombre}</Text>
            <TouchableOpacity
              className="rounded-lg bg-[#0F172A] px-6 py-1.5"
              onPress={() => handleVerResultado(r.nombre)}>
              <Text className="text-base font-bold text-white">Ver</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={{ height: 120 }} /> {/* Espacio extra para scroll */}
      </ScrollView>
    </View>
  );
};

export default Home;
