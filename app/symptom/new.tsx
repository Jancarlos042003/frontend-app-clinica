import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';

import DateTimeButton from '../../components/buttons/DateTimeButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import { ActivityIcon, Calendar, ClockIcon } from '../../components/icons/icons';
import DateTimeInput from '../../components/inputs/DateTimeInput';
import TextInputController from '../../components/inputs/TextInputController';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { ScreenWrapper } from '../../components/layouts/ScreenWrapper';
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
  } = useForm({
    defaultValues: {
      sintoma: '',
      intensidad: 'leve',
      fecha: new Date(),
      hora: new Date(new Date().setSeconds(0, 0)),
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
    <ScreenWrapper>
      <KeyboardAwareFormLayout>
        <View style={styles.formContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Síntoma</Text>
            <Controller
              name="sintoma"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: '#32729F' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
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
                      style={styles.icon}
                      color={isFocus ? '#32729F' : 'black'}
                      size={20}
                    />
                  )}
                />
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <DateTimeButton
              title="Fecha de Inicio"
              icon={<Calendar color="#000" size={21} />}
              setShowPicker={setShowDatePicker}
              formattedDate={formattedDate}
            />
          </View>

          <View style={styles.sectionContainer}>
            <DateTimeButton
              title="Inicio Aprox."
              icon={<ClockIcon color="#000" size={21} />}
              setShowPicker={setShowTimePicker}
              formattedDate={formattedTime}
            />
          </View>

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

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Intensidad</Text>
            <Controller
              name="intensidad"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  {intensityOptions.map((option) => (
                    <View key={option.value} style={styles.radioRow}>
                      <RadioButton value={option.value} color="#4189b6" uncheckedColor="#4189b6" />
                      <View style={styles.radioLabelRow}>
                        <Text>{option.icon}</Text>
                        <Text style={styles.radioLabelText}>{option.label}</Text>
                      </View>
                    </View>
                  ))}
                </RadioButton.Group>
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Duración</Text>
            <Controller
              name="duracion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioButton.Group onValueChange={onChange} value={value}>
                  {durationOptions.map((option) => (
                    <View key={option.value} style={styles.radioRow}>
                      <RadioButton
                        value={option.value.toString()}
                        color="#4189b6"
                        uncheckedColor="#4189b6"
                      />
                      <Text style={styles.radioLabelText}>{option.label}</Text>
                    </View>
                  ))}
                </RadioButton.Group>
              )}
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Notas</Text>
            <TextInputController
              control={control}
              name="notas"
              placeholder="Añadir detalles sobre el síntoma..."
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.submitButtonContainer}>
            <SubmitButton onPress={handleSubmit(onSubmit)} text="Registrar" />
          </View>
        </View>
      </KeyboardAwareFormLayout>
    </ScreenWrapper>
  );
};

export default NewSymptom;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  formContainer: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32729F',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  radioLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  radioLabelText: {
    marginLeft: 4,
    fontSize: 14,
  },
  submitButtonContainer: {
    marginTop: 8,
  },
});

