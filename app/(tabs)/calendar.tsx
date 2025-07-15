import { useState } from 'react';
import { ScrollView, RefreshControl, View } from 'react-native';

import HorizontalCalendar from '../../components/calendar/HorizontalCalendar';

import { useMedicationContext } from '~/context/MedicationContext';
import { useSymptomContext } from '~/context/SymptomContext';

const Calendar = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { refetch: refetchMedications } = useMedicationContext();
  const { refetch: refetchSymptoms } = useSymptomContext();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Actualizar ambos contextos en paralelo
      await Promise.all([refetchMedications(), refetchSymptoms()]);
      console.log('Datos del calendario actualizados');
    } catch (error) {
      console.error('Error al actualizar datos del calendario:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#0F172A']} // Color del indicador en Android
            tintColor="#0F172A" // Color del indicador en iOS
            title="Actualizando calendario..." // Texto en iOS
            titleColor="#0F172A" // Color del texto en iOS
          />
        }>
        <HorizontalCalendar />
      </ScrollView>
    </View>
  );
};

export default Calendar;
