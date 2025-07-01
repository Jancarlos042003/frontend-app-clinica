import type React from 'react';
import { Text, TextInput, type TextInputProps, View } from 'react-native';

// Input extiende TextInputProps para aceptar todas las propiedades de un TextInput
interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, required = false, ...props }) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-lg font-bold text-gray-700">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <TextInput
        className={`rounded-lg border p-4 text-base ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white focus:border-primary'
        }`}
        placeholderTextColor="#9CA3AF"
        selectionColor="#32729F"
        {...props}
      />
      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}
    </View>
  );
};
