import { View, Text } from 'react-native';

type LabelWithRequiredProps = {
  text: string;
  required?: boolean;
  className?: string;
};

export default function LabelWithRequired({
  text,
  required = false,
  className = 'text-base font-bold text-primary',
}: LabelWithRequiredProps) {
  return (
    <View className="flex-row">
      <Text className={className}>{text}</Text>
      {required && <Text className="font-bold text-red-500">*</Text>}
    </View>
  );
}
