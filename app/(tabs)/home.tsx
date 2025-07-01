import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';

import MedicationList from '../../components/lists/MedicationList';

import AppointmentList from '~/components/lists/AppointmentList';
import SymptomList from '~/components/lists/SymptomList';
import { useMedicationContext } from '~/context/MedicationContext';
import { useSymptomContext } from '~/context/SymptomContext';
import { Appointment } from '~/types/appointment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = () => {
  const { todaysMedications } = useMedicationContext();
  const { todaysSymptoms } = useSymptomContext();
  const insets = useSafeAreaInsets();

  // Resultados clínicos de ejemplo
  const resultados = [
    { id: 1, nombre: 'Análisis de sangre' },
    { id: 2, nombre: 'Resultados de perfil lipídico' },
  ];

  // Citas médicas de ejemplo
  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      doctorName: 'María González',
      specialty: 'Cardiología',
      date: '15 Jul 2025',
      time: '10:30 AM',
      location: 'Consultorio 301, Clínica San Rafael',
      type: 'presencial',
      status: 'confirmada',
    },
    {
      id: 2,
      doctorName: 'Carlos Mendoza',
      specialty: 'Medicina General',
      date: '18 Jul 2025',
      time: '2:00 PM',
      location: 'Telemedicina',
      type: 'virtual',
      status: 'programada',
    },
    {
      id: 3,
      doctorName: 'Ana Rodríguez',
      specialty: 'Dermatología',
      date: '22 Jul 2025',
      time: '11:15 AM',
      location: 'Centro Médico El Bosque',
      type: 'presencial',
      status: 'programada',
    },
  ];

  // --- HANDLERS ---
  const handleVerResultado = (nombre: string) => {
    Alert.alert('Resultado', `Mostrando resultado de: ${nombre}`);
  };

  const handleAppointmentPress = (appointment: Appointment) => {
    Alert.alert(
      'Detalles de la Cita',
      `Cita con Dr. ${appointment.doctorName}\n${appointment.specialty}\n${appointment.date} a las ${appointment.time}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={{ paddingBottom: insets.bottom }} className="flex-1">
      <ScrollView className="bg-[#d9eff4]] p-5">
        {/* Próximas Citas */}
        <Text className="mb-2 mt-4 text-lg font-bold text-[#0F172A]">Próximas Citas</Text>
        <AppointmentList
          appointments={upcomingAppointments}
          scrollEnabled={false}
          onAppointmentPress={handleAppointmentPress}
        />

        {/* Próximos Medicamentos */}
        <MedicationList medications={todaysMedications} scrollEnabled={false} />

        {/* Próximos Síntomas */}
        <SymptomList data={todaysSymptoms} scrollEnabled={false} />
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
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

export default Home;
