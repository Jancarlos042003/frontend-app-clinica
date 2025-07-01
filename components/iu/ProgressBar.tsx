import { View, Text } from 'react-native';

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar = ({ progress, label = 'Progreso del tratamiento' }: ProgressBarProps) => {
  return (
    <View className="mt-4">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-gray-700">{label}</Text>
        <Text className="text-sm font-bold text-gray-900">{progress}%</Text>
      </View>
      <View className="h-2 w-full rounded-full bg-gray-200">
        <View className="h-2 rounded-full bg-gray-800" style={{ width: `${progress}%` }} />
      </View>
    </View>
  );
};

export default ProgressBar;
