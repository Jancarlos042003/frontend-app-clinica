import { Control, Controller } from 'react-hook-form';
import { KeyboardTypeOptions, TextInput } from 'react-native';

type TextInputControllerProps = {
  name: string;
  control: Control<any>;
  placeholder: string;
  className?: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
};

const TextInputController = ({
  name,
  control,
  placeholder,
  className = 'w-full rounded border-2 text-lg border-gray-300 p-4',
  keyboardType = 'default',
  editable = true,
  autoFocus = false,
  multiline = false,
  numberOfLines = 1,
  maxLength = 100,
}: TextInputControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          className={className}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          keyboardType={keyboardType}
          editable={editable}
          autoFocus={autoFocus}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          style={[
            multiline && { textAlignVertical: 'top', minHeight: 100 }, // Ajustar altura para multiline
          ]}
        />
      )}
    />
  );
};

export default TextInputController;
