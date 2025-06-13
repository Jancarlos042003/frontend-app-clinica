import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import DateTimeButton from '../../../../components/buttons/DateTimeButton';
import { Calendar, ClockIcon } from '../../../../components/icons/icons';
import DateTimeInput from '../../../../components/inputs/DateTimeInput';

const NewSymptom = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    watch, // Para observar los cambios en el campo de fecha y hora
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fecha: new Date(),
      hora: new Date(new Date().setSeconds(0, 0)), // Establecemos la hora actual con segundos y milisegundos a cero
    },
  });

  // Obtenemos la fecha seleccionada del formulario
  const selectedDate = watch('fecha');
  // Obtenemos la hora seleccionada del formulario
  const selectedTime = watch('hora');

  // Formateamos la fecha al español
  const formattedDate = format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
  const formattedTime = format(selectedTime, 'hh:mm a', { locale: es });

  return (
    <View className="p-4">
      <Text className="text-base text-neutral-400">
        Registra tus síntomas diarios para llevar un seguimiento de tu salud
      </Text>

      <DateTimeButton
        title="Fecha"
        icon={<Calendar color="#000" size={21} />}
        setShowPicker={setShowDatePicker}
        formattedDate={formattedDate}
      />

      <DateTimeButton
        title="Hora"
        icon={<ClockIcon color="#000" size={21} />}
        setShowPicker={setShowTimePicker}
        formattedDate={formattedTime}
      />

      {showDatePicker && (
        <DateTimeInput
          control={control}
          mode="date"
          name="fecha"
          setShowPicker={setShowDatePicker}
        />
      )}

      {showTimePicker && (
        <DateTimeInput
          control={control}
          mode="time"
          name="hora"
          setShowPicker={setShowTimePicker}
        />
      )}
    </View>
  );
};

export default NewSymptom;
