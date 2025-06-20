import DateTimePicker from '@react-native-community/datetimepicker';
import type React from 'react';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

interface DateTimePickerProps {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
}

export const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  error,
  required = false,
}) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');

  const onDateTimeChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value || new Date();
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-bold text-gray-700">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      <View className="flex-row space-x-2">
        <TouchableOpacity
          onPress={() => showMode('date')}
          className={`flex-1 rounded-lg border p-4 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}>
          <Text className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value ? formatDateTime(value) : 'Seleccionar fecha y hora'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode={mode}
          is24Hour
          display="default"
          onChange={onDateTimeChange}
        />
      )}
    </View>
  );
};
