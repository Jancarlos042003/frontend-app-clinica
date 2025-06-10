import React from 'react';
import { Text, View } from 'react-native';

import { useUser } from '../../hooks/useUser';

const Welcome = () => {
  const { user } = useUser();
  const name: string = user?.name || '';

  return (
    <View className="ml-4">
      <Text className="text-xl font-bold text-white">Bienvenido {name}</Text>
    </View>
  );
};

export default Welcome;
