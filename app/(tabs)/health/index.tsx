import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import CardContainer from '../../../components/card/CardContainer';
import { ActivityIcon } from '../../../components/icons/icons';

const Index = () => {
  const router = useRouter();

  return (
    <View className="gap-2 p-2">
      <CardContainer onPress={() => router.push('/(tabs)/health/symptoms/')}>
        <View className="flex-row justify-between">
          <Text className="text-xl">Síntomas Registrados</Text>
          <ActivityIcon color="#000" size={24} />
        </View>
        <View className="flex-col">
          <Text className="text-2xl font-bold">3</Text>
          <Text className="text-base text-gray-400">Esta semana</Text>
        </View>
      </CardContainer>

      <CardContainer onPress={() => router.push('/(tabs)/health/treatments/')}>
        <View className="flex-row justify-between">
          <Text className="text-xl">Tratamientos Registrados</Text>
          <ActivityIcon color="#000" size={24} />
        </View>
        <View className="flex-col">
          <Text className="text-2xl font-bold">3</Text>
          <Text className="text-base text-gray-400">1 completado esta semana</Text>
        </View>
      </CardContainer>
    </View>
  );
};

export default Index;
