import { View, Text } from 'react-native';

type LoaderProps = {
  message?: string;
};

const Loader = ({ message = 'Cargando...' }: LoaderProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-500">{message}</Text>
    </View>
  );
};

export default Loader;
