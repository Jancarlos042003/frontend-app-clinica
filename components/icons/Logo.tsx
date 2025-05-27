import { Text, View } from 'react-native';

import { LogoIcon } from './icons';

const Logo = () => {
  return (
    <View className="flex-row items-end justify-center">
      <View className="shadow-lg">
        <LogoIcon size={100} color="#FFF" />
      </View>

      <View className="pl-2">
        <Text className="text-6xl font-bold italic text-white">Medi+</Text>
        <Text className="text-lg font-medium italic text-white/90">Contigo, siempre</Text>
      </View>
    </View>
  );
};

export default Logo;
