import { zodResolver } from '@hookform/resolvers/zod';
import useApi from 'hooks/useApi';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from '../../components/iu/Title';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { CustomDateTimePicker } from '../../components/medicacion/DateTimePicker';
import { Dropdown } from '../../components/medicacion/Dropdown';
import { Input } from '../../components/medicacion/Input';
import { MedicationFormData, medicationSchema } from '../../schemas/medicationSchema';
import { DOSE_UNITS, DURATION_UNITS } from '../../utils/medicationOptions';
import { useUser } from 'hooks/useUser';
import { TreatmentRecord } from 'schemas/TreatmentRecordSchema';
import SubmitButton from 'components/buttons/SubmitButton';

export default function MedicationFormScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const { data, fetchData, error, loading } = useApi<TreatmentRecord[]>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      nameMedicine: '',
      doseValue: undefined,
      doseUnit: '',
      frequency: undefined,
      period: undefined,
      periodUnit: '',
      startDate: new Date(),
      startTime: new Date(),
      duration: undefined,
      durationUnit: '',
      hasCustomTimes: false,
      customTimes: [],
    },
  });

  const onSubmit = async (data: MedicationFormData) => {
    if (!user?.dni) {
      Alert.alert('Error', 'No se pudo obtener el DNI del usuario.');
      return;
    }

    const dateTime = new Date(data.startDate);

    // Combinar fecha y hora de inicio
    if (data.startTime) {
      const hours = new Date(data.startTime).getHours();
      const minutes = new Date(data.startTime).getMinutes();
      dateTime.setHours(hours, minutes, 0, 0);
    }

    // Eliminar startTime del objeto para evitar duplicación
    const { startTime, ...dataWithoutStartTime } = data;

    // Formatear la fecha al formato ISO 8601
    const formattedData = {
      ...dataWithoutStartTime,
      startDate: new Date(dateTime).toISOString(),
      identifier: user?.dni,
    };

    console.log('Datos del formulario:', JSON.stringify(formattedData, null, 2));

    fetchData(`/api/treatments`, 'POST', formattedData);

    // Hacer que aparezca un mensaje de éxito

    reset(); // Reiniciar el formulario después de enviar
  };

  return (
    <KeyboardAwareFormLayout>
      <View
        className="flex-1 bg-[#ededed] px-4 pt-4"
        style={{ paddingBottom: insets.bottom + 16 }}>
        <Title title="Datos del Medicamento" />
        {/* Nombre de la medicina */}
        <Controller
          control={control}
          name="nameMedicine"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nombre de la medicina"
              placeholder="Ej: Amoxicilina"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.nameMedicine?.message}
              required
            />
          )}
        />

        {/* Valor de la dosis */}
        <Controller
          control={control}
          name="doseValue"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Valor de la dosis"
              placeholder="Ej: 250 mg"
              value={value?.toString() || ''}
              onChangeText={(text) => {
                const numValue = Number.parseFloat(text);
                onChange(isNaN(numValue) ? undefined : numValue);
              }}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.doseValue?.message}
              required
            />
          )}
        />

        {/* Unidad de dosis */}
        <Controller
          control={control}
          name="doseUnit"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label="Unidad de dosis"
              options={DOSE_UNITS}
              value={value}
              onSelect={onChange}
              placeholder="Seleccionar unidad"
              error={errors.doseUnit?.message}
              required
            />
          )}
        />

        {/* Fecha y hora de inicio */}
        <Title title="Frecuencia y Horario" />
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <CustomDateTimePicker
              label="Fecha inicio"
              mode="date"
              value={value}
              onChange={onChange}
              error={errors.startDate?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="startTime"
          render={({ field: { onChange, value } }) => (
            <CustomDateTimePicker
              label="Hora de inicio"
              mode="time"
              value={value}
              onChange={onChange}
              error={errors.startTime?.message}
              required
            />
          )}
        />

        {/* Frecuencia */}
        <Controller
          control={control}
          name="frequency"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Frecuencia"
              placeholder="Ej: 2 (veces al día)"
              value={value?.toString() || ''}
              onChangeText={(text) => {
                const numValue = Number.parseFloat(text);
                onChange(isNaN(numValue) ? undefined : numValue);
              }}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.frequency?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="period"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Cada cuánto tiempo"
              placeholder="Ej: Cada 12 (horas)"
              value={value?.toString() || ''}
              onChangeText={(text) => {
                const numValue = Number.parseFloat(text);
                onChange(isNaN(numValue) ? undefined : numValue);
              }}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.period?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="periodUnit"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label="Unidad de tiempo"
              options={DURATION_UNITS}
              value={value}
              onSelect={onChange}
              placeholder="Seleccionar unidad"
              error={errors.periodUnit?.message}
              required
            />
          )}
        />

        {/* Duración */}
        <Title title="Duración del Tratamiento" />
        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Duración"
              placeholder="Ej: 7 (días)"
              value={value?.toString() || ''}
              onChangeText={(text) => {
                const numValue = Number.parseFloat(text);
                onChange(isNaN(numValue) ? undefined : numValue);
              }}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.duration?.message}
              required
            />
          )}
        />

        {/* Unidad de duración */}
        <Controller
          control={control}
          name="durationUnit"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              label="Unidad de duración"
              options={DURATION_UNITS}
              value={value}
              onSelect={onChange}
              placeholder="Seleccionar unidad"
              error={errors.durationUnit?.message}
              required
            />
          )}
        />

        <View className="mt-4">
          <SubmitButton onPress={handleSubmit(onSubmit)} loading={loading} text="Registrar" />
        </View>
      </View>
    </KeyboardAwareFormLayout>
  );
}
