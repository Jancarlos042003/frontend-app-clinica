import { View, Text, TouchableOpacity } from 'react-native';

import { ClockIcon } from '../icons/icons';

import { Appointment } from '~/types/appointment';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: (appointment: Appointment) => void;
}

const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'bg-green-100 border-green-300';
      case 'cancelada':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-blue-100 border-blue-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return 'Programada';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'virtual' ? '💻' : '🏥';
  };

  return (
    <TouchableOpacity
      className={`rounded-xl border p-4 shadow-sm ${getStatusColor(appointment.status)}`}
      onPress={() => onPress?.(appointment)}
      activeOpacity={0.7}>
      {/* Header con especialidad y tipo */}
      <View className="mb-2 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Text className="text-sm font-medium text-gray-600">
            {getTypeIcon(appointment.type)} {appointment.specialty}
          </Text>
        </View>
        <View className="rounded-full bg-white px-2 py-1">
          <Text className="text-xs font-medium text-gray-700">
            {getStatusText(appointment.status)}
          </Text>
        </View>
      </View>

      {/* Doctor */}
      <Text className="mb-1 text-lg font-bold text-[#0F172A]">Dr. {appointment.doctorName}</Text>

      {/* Fecha y hora */}
      <View className="mb-2 flex-row items-center">
        <ClockIcon size={16} color="#6B7280" />
        <Text className="ml-1 text-sm text-gray-600">
          {appointment.date} • {appointment.time}
        </Text>
      </View>

      {/* Ubicación */}
      {appointment.location && (
        <Text className="text-sm text-gray-500">📍 {appointment.location}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppointmentCard;
