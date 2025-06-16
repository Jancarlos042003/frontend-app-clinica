import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { KeyboardTypeOptions, StyleSheet, TextInput } from 'react-native';

type TextInputControllerProps = {
  name: string;
  control: Control<any>;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
};

const TextInputController = ({
  name,
  control,
  placeholder,
  keyboardType = 'default',
  editable = true,
  autoFocus = false,
  multiline = false,
  numberOfLines = 1,
}: TextInputControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.input, multiline && styles.multiline]}
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          keyboardType={keyboardType}
          editable={editable}
          autoFocus={autoFocus}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    padding: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#111827',
  },
  multiline: {
    textAlignVertical: 'top',
    minHeight: 100,
  },
});

export default TextInputController;
