import { Text, View } from 'react-native';

import { useUser } from '../../hooks/useUser';

const Home = () => {
  const { user } = useUser();

  return (
    <View className="flex-1">
      <Text className="text-2xl">
        Bienvenido <Text className="font-bold">{user?.name}</Text>
      </Text>
    </View>
  );
};

export default Home;
