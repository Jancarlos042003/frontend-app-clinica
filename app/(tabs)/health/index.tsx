import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import CardContainer from '../../../components/card/CardContainer';
import { ActivityIcon } from '../../../components/icons/icons';

const Index = () => {
  const router = useRouter();

  return (
    <View className="flex-1 gap-3 bg-primary_100 p-4">
      <CardContainer onPress={() => router.push('/symptom/')}>
        <View className="flex-row justify-between">
          <Text className="text-xl">Síntomas Registrados</Text>
          <ActivityIcon color="#000" size={24} />
        </View>
        <View className="flex-col">
          <Text className="text-2xl font-bold">3</Text>
          <Text className="text-base text-gray-600">Esta semana</Text>
        </View>
      </CardContainer>

      <CardContainer onPress={() => router.push('/medication/')}>
        <View className="flex-row justify-between">
          <Text className="text-xl">Tratamientos Registrados</Text>
          <ActivityIcon color="#000" size={24} />
        </View>
        <View className="flex-col">
          <Text className="text-2xl font-bold">3</Text>
          <Text className="text-base text-gray-600">1 completado esta semana</Text>
        </View>
      </CardContainer>
    </View>
  );
};

export default Index;
