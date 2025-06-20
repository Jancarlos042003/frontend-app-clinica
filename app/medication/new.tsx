import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { CustomDateTimePicker } from '../../components/medicacion/DateTimePicker';
import { Dropdown } from '../../components/medicacion/Dropdown';
import { Input } from '../../components/medicacion/Input';
import { MedicationFormData, medicationSchema } from '../../schemas/medicationSchema';
import { DOSE_UNITS, DURATION_UNITS } from '../../utils/medicationOptions';

export default function MedicationFormScreen() {
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      nameMedicine: '',
      doseValue: undefined,
      doseUnit: '',
      frequencyHours: undefined,
      startDate: '',
      duration: undefined,
      durationUnit: '',
    },
  });

  const onSubmit = async (data: MedicationFormData) => {
    try {
      // Formatear la fecha al formato ISO 8601
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
      };

      console.log('Datos del formulario:', JSON.stringify(formattedData, null, 2));

      Alert.alert(
        'Éxito',
        'Medicación guardada correctamente. Revisa la consola para ver los datos.',
        [
          {
            text: 'OK',
            onPress: () => reset(),
          },
        ]
      );
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      Alert.alert('Error', 'Hubo un problema al guardar la medicación');
    }
  };

  return (
    <KeyboardAwareFormLayout>
      <View className="flex-1 px-4 pt-4" style={{ paddingBottom: insets.bottom + 16 }}>
        {/* Nombre de la medicina */}
        <Controller
          control={control}
          name="nameMedicine"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nombre de la medicina"
              placeholder="Ej: Amoxicilina 250mg"
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
              placeholder="Ej: 250"
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

        {/* Frecuencia en horas */}
        <Controller
          control={control}
          name="frequencyHours"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Frecuencia (cada cuántas horas)"
              placeholder="Ej: 8 (cada 8 horas)"
              value={value?.toString() || ''}
              onChangeText={(text) => {
                const numValue = Number.parseFloat(text);
                onChange(isNaN(numValue) ? undefined : numValue);
              }}
              onBlur={onBlur}
              keyboardType="numeric"
              error={errors.frequencyHours?.message}
              required
            />
          )}
        />

        {/* Fecha y hora de inicio */}
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value } }) => (
            <CustomDateTimePicker
              label="Fecha y hora de inicio"
              value={value ? new Date(value) : undefined}
              onChange={(date) => onChange(date.toISOString())}
              error={errors.startDate?.message}
              required
            />
          )}
        />

        {/* Duración */}
        <Controller
          control={control}
          name="duration"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Duración del tratamiento"
              placeholder="Ej: 7"
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

        {/* Botón de envío */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`mt-6 rounded-lg px-6 py-4 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 active:bg-blue-700'}`}>
          <Text className="text-center text-lg font-semibold text-white">
            {isSubmitting ? 'Guardando...' : 'Guardar Medicación'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareFormLayout>
  );
}
