import { zodResolver } from '@hookform/resolvers/zod';
import ValidationError from 'components/card/ValidationError';
import { use, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

import SubmitButton from '../../components/buttons/SubmitButton';
import { ActivityIcon } from '../../components/icons/icons';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { CustomDateTimePicker } from '../../components/medicacion/DateTimePicker';
import { Input } from '../../components/medicacion/Input';
import { symptomSchema, SymptomSchema } from '../../schemas/SymptomSchema';
import { durationOptions, intensityOptions, symptomOptions } from '../../utils/symptomOptions';
import useApi from '../../hooks/useApi';
import { useUser } from '../../hooks/useUser';
import { useSymptomContext } from '~/context/SymptomContext';
import { Symptom } from '~/types/symptom';

const NewSymptom = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useUser(); // Asegúrate de que useUser esté correctamente importado
  const { data: newSymptom, error, loading, fetchData, clearError } = useApi<Symptom>();
  const { addSymptom } = useSymptomContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SymptomSchema>({
    resolver: zodResolver(symptomSchema), // Usar el schema directamente
    defaultValues: {
      symptom: '',
      intensity: 'Leve',
      date: undefined,
      time: undefined,
      duration: '59',
      notes: '',
    },
  });

  // Cuando se recibe un nuevo síntoma, lo agregamos al contexto
  useEffect(() => {
    if (newSymptom) {
      addSymptom(newSymptom); // Agregar el nuevo síntoma al contexto
    }
    if (error) {
      console.error('Error al registrar el síntoma:', error);
    }
  }, [newSymptom]);

  const onSubmit = (data: SymptomSchema) => {
    // Combinar fecha y hora en un solo objeto Date
    const dateTime = new Date(data.date);
    const timeData = new Date(data.time);

    // Establecer la hora de la fecha seleccionada
    dateTime.setHours(
      timeData.getHours(),
      timeData.getMinutes(),
      0, // segundos
      0 // milisegundos
    );

    // Eliminamos time de los datos para evitar duplicación
    const { time, ...dataWithoutTime } = data;

    const symptomData = {
      ...dataWithoutTime,
      date: dateTime.toISOString(),
      identifier: user?.dni, // Asegúrate de que user esté definido
    };

    console.log('Data de síntoma:', symptomData);

    fetchData('/api/symptom-diary', 'POST', symptomData);
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 gap-1 bg-[#ededed] p-4">
        <View className="mb-3">
          <View className="flex-row">
            <Text className="mb-2 text-lg font-bold text-gray-700">Síntoma</Text>
            <Text className="ml-1 text-lg font-bold text-red-500">*</Text>
          </View>
          <Controller
            name="symptom"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={{
                  height: 50,
                  backgroundColor: '#fff',
                  borderColor: isFocus ? '#32729F' : '#d1d5db',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                }}
                placeholderStyle={{ fontSize: 14, color: '#6b7280' }}
                selectedTextStyle={{ fontSize: 14 }}
                iconStyle={{ width: 20, height: 20 }}
                inputSearchStyle={{ height: 40, fontSize: 14 }}
                data={symptomOptions}
                search
                dropdownPosition="bottom"
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
                    color={isFocus ? '#32729F' : '#6b7280'}
                    size={20}
                    style={{ marginRight: 4 }}
                  />
                )}
              />
            )}
          />
          {errors.symptom && <ValidationError message={errors.symptom.message} />}
        </View>

        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomDateTimePicker
              label="Fecha de Inicio"
              mode="date"
              value={value ? new Date(value) : undefined}
              onChange={(date) => onChange(date.toISOString())}
              error={errors.date?.message}
              required
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          render={({ field: { onChange, value } }) => (
            <CustomDateTimePicker
              label="Hora de Inicio"
              mode="time"
              value={value ? new Date(value) : undefined}
              onChange={(date) => onChange(date.toISOString())}
              error={errors.time?.message}
              required
            />
          )}
        />

        <View className="mb-0">
          <View className="flex-row">
            <Text className="text-lg font-bold text-gray-700">Intensidad</Text>
            <Text className="ml-1 text-lg font-bold text-red-500">*</Text>
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
                    labelStyle={{ fontSize: 14 }}
                  />
                ))}
              </RadioButton.Group>
            )}
          />
          {errors.intensity && <ValidationError message={errors.intensity.message} />}
        </View>

        <View className="mb-0">
          <View className="flex-row">
            <Text className="text-lg font-bold text-gray-700">Duración</Text>
            <Text className="ml-1 text-lg font-bold text-red-500">*</Text>
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
                    labelStyle={{ fontSize: 14 }}
                  />
                ))}
              </RadioButton.Group>
            )}
          />
          {errors.duration && <ValidationError message={errors.duration.message} />}
        </View>

        <View className="mb-2">
          <Controller
            name="notes"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Notas"
                placeholder="Añade detalles sobre el síntoma..."
                error={errors.notes?.message}
                multiline // Permite múltiples líneas
                numberOfLines={4} // Número de líneas visibles
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={{ height: 110, textAlignVertical: 'top' }} // Asegura que el texto comience desde la parte superior
              />
            )}
          />
        </View>

        <View className="mb-14">
          <SubmitButton onPress={handleSubmit(onSubmit)} loading={loading} text="Registrar" />
        </View>
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default NewSymptom;
