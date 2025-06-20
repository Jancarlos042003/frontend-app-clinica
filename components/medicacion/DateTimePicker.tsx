import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardAwareFormLayout from "components/layouts/KeyboardAwareFormLayout";
import { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

interface DateTimePickerProps {
  label: string;
  value?: Date;
  mode: 'date' | 'time';
  onChange: (date: Date) => void;
  error?: string;
  required?: boolean;
}

export const CustomDateTimePicker = ({
  label,
  value,
  mode = 'date',
  onChange,
  error,
  required = false,
}: DateTimePickerProps) => {
  const [show, setShow] = useState(false);
  const [tempValue, setTempValue] = useState<Date | undefined>(value);

  const onDateTimeChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // En Android, el evento puede ser 'dismissed' o 'set'
      if (event.type === 'dismissed') {
        setShow(false);
        return;
      }
      if (event.type === 'set' && selectedDate) {
        setShow(false);
        onChange(selectedDate);
      }
    } else {
      // En iOS, mantenemos el valor temporal mientras el usuario selecciona
      if (selectedDate) {
        setTempValue(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    if (tempValue) {
      onChange(tempValue);
    }
    setShow(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setShow(false);
  };

  const openPicker = () => {
    setTempValue(value || new Date());
    setShow(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal transparent animationType="fade" visible={show} onRequestClose={handleCancel}>
          <KeyboardAwareFormLayout>
            <View className="flex-1 justify-end bg-black/50">
              <View className="rounded-t-2xl bg-white">
                <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
                  <Pressable onPress={handleCancel}>
                    <Text className="text-lg text-blue-500">Cancelar</Text>
                  </Pressable>
                  <Text className="text-lg font-semibold text-gray-900">
                    {mode === 'date' ? 'Seleccionar Fecha' : 'Seleccionar Hora'}
                  </Text>
                  <Pressable onPress={handleConfirm}>
                    <Text className="text-lg font-semibold text-blue-500">Confirmar</Text>
                  </Pressable>
                </View>

                <View className="flex items-center justify-center pb-3">
                  <DateTimePicker
                    value={tempValue || new Date()}
                    mode={mode}
                    display="spinner"
                    is24Hour
                    onChange={onDateTimeChange}
                    style={{ backgroundColor: 'write' }}
                    textColor="black" // Cambia el color del texto
                    locale="es-ES" // Configura el locale para español
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareFormLayout>
        </Modal>
      );
    } else {
      // Android mantiene el comportamiento nativo
      return (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          is24Hour
          display="default"
          onChange={onDateTimeChange}
        />
      );
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-bold text-gray-700">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <View className="flex-row space-x-2">
        <Pressable
          onPress={openPicker}
          className={`flex-1 rounded-lg border p-4 ${
            error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
          }`}>
          <Text className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value
              ? mode === 'date'
                ? formatDate(value)
                : formatTime(value)
              : mode === 'date'
                ? 'Seleccionar fecha'
                : 'Seleccionar hora'}
          </Text>
        </Pressable>
      </View>
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
      {show && renderPicker()}
    </View>
  );
};
