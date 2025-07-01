import { View, Text } from 'react-native';

type NotResultsProps = {
  label?: string;
};

const NotResults = ({ label = 'No hay resultados' }: NotResultsProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-500">{label}</Text>
    </View>
  );
};

export default NotResults;
