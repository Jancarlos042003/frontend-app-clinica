import { View, FlatList } from 'react-native';

import AppointmentCard from '../card/AppointmentCard';
import EmptyStateCard from '../card/EmptyStateCard';

import { Appointment } from '~/types/appointment';

interface AppointmentListProps {
  appointments: Appointment[];
  scrollEnabled?: boolean;
  onAppointmentPress?: (appointment: Appointment) => void;
  [key: string]: any;
}

const AppointmentList = ({
  appointments,
  scrollEnabled = true,
  onAppointmentPress,
  ...otherProps
}: AppointmentListProps) => {
  return (
    <View className="flex-1">
      {appointments.length > 0 ? (
        scrollEnabled ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <AppointmentCard appointment={item} onPress={onAppointmentPress} />
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            {...otherProps}
          />
        ) : (
          <View>
            {appointments.map((item, index) => (
              <View key={item.id || index} style={{ marginBottom: 10 }}>
                <AppointmentCard appointment={item} onPress={onAppointmentPress} />
              </View>
            ))}
          </View>
        )
      ) : (
        <EmptyStateCard
          title="No hay citas programadas"
          description="Agenda una cita médica para comenzar a recibir recordatorios."
          buttonLabel="Agendar Cita"
          onAdd={() => {}}
        />
      )}
    </View>
  );
};

export default AppointmentList;
