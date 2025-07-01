import { View, Text } from 'react-native';

interface TreatmentInfoRowProps {
  leftLabel: string;
  leftValue: string;
  rightLabel?: string;
  rightValue?: string;
}

const TreatmentInfoRow = ({
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
}: TreatmentInfoRowProps) => {
  return (
    <View className="mt-4 flex-row justify-between">
      <View className="flex-1">
        <Text className="mb-1 text-sm font-medium text-gray-700">{leftLabel}</Text>
        <Text className="text-sm text-gray-900">{leftValue}</Text>
      </View>
      {rightLabel && rightValue && (
        <View className="flex-1">
          <Text className="mb-1 text-sm font-medium text-gray-700">{rightLabel}</Text>
          <Text className="text-sm text-gray-900">{rightValue}</Text>
        </View>
      )}
    </View>
  );
};

export default TreatmentInfoRow;
