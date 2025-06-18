import { zodResolver } from '@hookform/resolvers/zod';
import ValidationError from 'components/card/ValidationError';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import { SymptomSchema, SymptomSchemaType } from 'schemas/SymptomSchema';

import DateTimeButton from '../../components/buttons/DateTimeButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import { ActivityIcon, Calendar, ClockIcon } from '../../components/icons/icons';
import DateTimeInput from '../../components/inputs/DateTimeInput';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { formatDate, formatTime } from '../../utils/dateFormatter';
import { durationOptions, intensityOptions, symptomOptions } from '../../utils/symptomOptions';

const NewSymptom = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SymptomSchemaType>({
    resolver: zodResolver(SymptomSchema),
    defaultValues: {
      symptom: '',
      intensity: '255604002',
      date: new Date(),
      time: new Date(new Date().setSeconds(0, 0)),
      duration: '59',
      notes: '',
    },
  });

  // Obtenemos la fecha y hora seleccionada del formulario
  const selectedDate = watch('date');
  const selectedTime = watch('time');

  // Formateamos la fecha y hora al español
  const formattedDate = formatDate(selectedDate);
  const formattedTime = formatTime(selectedTime);

  const onSubmit = (data: any) => {
    // Combinar fecha y hora en un solo objeto Date
    const fechaCompleta = new Date(data.date);
    const hora = new Date(data.time);

    // Establecer la hora de la fecha seleccionada
    fechaCompleta.setHours(
      hora.getHours(),
      hora.getMinutes(),
      0, // segundos
      0 // milisegundos
    );
    console.log('Datos del síntoma:', data);
    console.log('Fecha y hora combinadas:', fechaCompleta);
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 gap-4 p-4">
        <View className="mb-3">
          <View className="flex-row">
            <Text className="mb-2 text-xl font-bold text-primary">Síntoma</Text>
            <Text className="text-xl text-red-500">*</Text>
          </View>
          <Controller
            name="symptom"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={{
                  height: 50,
                  borderColor: isFocus ? '#32729F' : 'gray',
                  borderWidth: 2,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                placeholderStyle={{ fontSize: 14 }}
                selectedTextStyle={{ fontSize: 14 }}
                inputSearchStyle={{ height: 40, fontSize: 14 }}
                iconStyle={{ width: 20, height: 20 }}
                data={symptomOptions}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Selecciona un síntoma' : '...'}
                searchPlaceholder="Buscar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  onChange(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <ActivityIcon
                    color={isFocus ? '#32729F' : 'black'}
                    size={20}
                    style={{ marginRight: 4 }}
                  />
                )}
              />
            )}
          />
          {errors.symptom && <ValidationError message={errors.symptom.message} />}
        </View>

        <View className="mb-3">
          <DateTimeButton
            title="Fecha de Inicio"
            icon={<Calendar color="#000" size={21} />}
            setShowPicker={setShowDatePicker}
            formattedDate={formattedDate}
          />
          {errors.date && <ValidationError message={errors.date.message} />}
        </View>

        {showDatePicker && (
          <DateTimeInput
            control={control}
            mode="date"
            name="date"
            setShowPicker={setShowDatePicker}
          />
        )}

        <View className="mb-3">
          <DateTimeButton
            title="Inicio Aprox."
            icon={<ClockIcon color="#000" size={21} />}
            setShowPicker={setShowTimePicker}
            formattedDate={formattedTime}
          />
        </View>
        {errors.time && <ValidationError message={errors.time.message} />}

        {showTimePicker && (
          <DateTimeInput
            control={control}
            mode="time"
            name="time"
            setShowPicker={setShowTimePicker}
          />
        )}

        <View className="mb-0">
          <View className="flex-row">
            <Text className="mb-2 text-xl font-bold text-primary">Intensidad</Text>
            <Text className="text-xl text-red-500">*</Text>
          </View>
          <Controller
            name="intensity"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                {intensityOptions.map((option) => (
                  <RadioButton.Item
                    key={option.value}
                    label={option.label}
                    value={option.value.toString()}
                    color="#4189b6"
                    uncheckedColor="#4189b6"
                    labelStyle={{ fontSize: 15 }}
                  />
                ))}
              </RadioButton.Group>
            )}
          />
          {errors.intensity && <ValidationError message={errors.intensity.message} />}
        </View>

        <View className="mb-0">
          <View className="flex-row">
            <Text className="mb-2 text-xl font-bold text-primary">Duración</Text>
            <Text className="text-xl text-red-500">*</Text>
          </View>
          <Controller
            name="duration"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                {durationOptions.map((option) => (
                  <RadioButton.Item
                    key={option.value}
                    label={option.label}
                    value={option.value.toString()}
                    color="#4189b6"
                    uncheckedColor="#4189b6"
                    labelStyle={{ fontSize: 15 }}
                  />
                ))}
              </RadioButton.Group>
            )}
          />
          {errors.duration && <ValidationError message={errors.duration.message} />}
        </View>

        <View className="mb-2">
          <Text className="mb-2 text-xl font-bold text-primary">Notas</Text>
          <TextInputController
            control={control}
            name="notes"
            placeholder="Añadir detalles sobre el síntoma..."
            multiline
            numberOfLines={4}
          />
          {errors.notes && <ValidationError message={errors.notes.message} />}
        </View>

        <View className="mb-14">
          <SubmitButton onPress={handleSubmit(onSubmit)} text="Registrar" />
        </View>
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default NewSymptom;
