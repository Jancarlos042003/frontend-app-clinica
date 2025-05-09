import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import TogglePasswordButton from '../buttons/TogglePasswordButton';

const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
  error,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <View className="relative">
        <TextInput
          className={`border bg-white ${error ? 'border-red-500' : 'border-[#D4D4D8]'} mb-2 rounded-lg p-4 pr-12 text-base text-[#101010]`}
          placeholder={placeholder}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        <TogglePasswordButton
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </View>
      {error && <Text className="text-sm text-red-500">{error}</Text>}
    </View>
  );
};

export default PasswordInput;
