import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';
import { Platform } from 'react-native';

type DateTimeInputProps = {
  name: string;
  control: any;
  mode: 'date' | 'time';
  setShowPicker: (show: boolean) => void;
};

const DateTimeInput = ({ name, control, mode, setShowPicker }: DateTimeInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowPicker(false); // Cerramos el picker después de seleccionar la fecha/hora
            // Verificamos si se seleccionó una fecha/hora
            if (selectedDate) {
              onChange(selectedDate); // Actualizamos el valor en el formulario
            }
          }}
        />
      )}
    />
  );
};

export default DateTimeInput;
