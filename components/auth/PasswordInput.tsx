import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

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
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error && styles.inputError]}
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
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D4D4D8',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    paddingRight: 48,
    fontSize: 18,
    color: '#101010',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
  },
});

export default PasswordInput;
