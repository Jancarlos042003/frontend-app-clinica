import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

import DateTimeButton from '../../../../components/buttons/DateTimeButton';
import { Calendar, ClockIcon } from '../../../../components/icons/icons';
import DateTimeInput from '../../../../components/inputs/DateTimeInput';
import TextInputController from '../../../../components/inputs/TextInputController';

const intensityOptions = [
  { label: 'Leve', value: '255604002', icon: '😌' },
  { label: 'Moderado', value: '6736007', icon: '😐' },
  { label: 'Severo', value: '24484000', icon: '😟' },
];

const durationOptions = [
  { label: '< 1 hora', value: '59' },
  { label: '1-4 horas', value: '180' },
  { label: 'Todo el día', value: '1440' },
  { label: 'Continúa', value: '-1' },
];

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
      intensidad: 'leve', // Valor por defecto para la intensidad
      fecha: new Date(),
      hora: new Date(new Date().setSeconds(0, 0)), // Establecemos la hora actual con segundos y milisegundos a cero
      duracion: '0',
      notas: '',
    },
  });

  // Obtenemos la fecha seleccionada del formulario
  const selectedDate = watch('fecha');
  // Obtenemos la hora seleccionada del formulario
  const selectedTime = watch('hora');

  // Formateamos la fecha al español
  const formattedDate = format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: es });
  const formattedTime = format(selectedTime, 'hh:mm a', { locale: es });

  const onSubmit = (data: any) => {
    console.log('Datos del síntoma:', data);
  };

  return (
    <View className="p-4">
      <Text className="text-base text-neutral-400">
        Registra tus síntomas diarios para llevar un seguimiento de tu salud
      </Text>

      <DateTimeButton
        title="Fecha de Inicio"
        icon={<Calendar color="#000" size={21} />}
        setShowPicker={setShowDatePicker}
        formattedDate={formattedDate}
      />

      <DateTimeButton
        title="Inicio Aprox."
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

      <View>
        <Text className="text-xl font-bold text-primary">Intensidad</Text>
        <Controller
          name="intensidad"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {intensityOptions.map((option) => (
                <View key={option.value} className="mb-1 flex-row items-center">
                  <RadioButton value={option.value} color="#4189b6" uncheckedColor="#4189b6" />
                  <Text className="ml-1">
                    {option.icon} {option.label}
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          )}
        />
      </View>

      <View>
        <Text className="text-xl font-bold text-primary">Duración</Text>
        <Controller
          name="duracion"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {durationOptions.map((option) => (
                <View key={option.value} className="mb-1 flex-row items-center">
                  <RadioButton
                    value={option.value.toString()}
                    color="#4189b6"
                    uncheckedColor="#4189b6"
                  />
                  <Text className="ml-1">{option.label}</Text>
                </View>
              ))}
            </RadioButton.Group>
          )}
        />
      </View>

      <View>
        <Text className="text-xl font-bold text-primary">Notas</Text>
        <TextInputController
          control={control}
          name="notas"
          placeholder="Añadir detalles sobre el síntoma..."
          multiline
          numberOfLines={4}
        />
      </View>

      <Button title="Registrar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default NewSymptom;
