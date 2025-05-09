import { Text, View } from 'react-native';

import { getPasswordStrength, Strength } from '../../utils/auth/getPasswordStrength';

const PasswordStrengthIndicator = ({ value }: { value: string }) => {
  const passwordStrength: Strength = getPasswordStrength(value);

  return (
    <View className="mb-2">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className={`text-xs ${passwordStrength.textColor}`}>Seguridad:</Text>
        <Text className={`text-xs ${passwordStrength.textColor}`}>{passwordStrength.label}</Text>
      </View>
      <View className="h-1 overflow-hidden rounded-full bg-[#D4D4D8]">
        <View
          className={`h-full ${passwordStrength.color}`}
          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
        />
      </View>
    </View>
  );
};

export default PasswordStrengthIndicator;
