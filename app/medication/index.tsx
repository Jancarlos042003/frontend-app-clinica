import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const IndexMedication = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Text>Screen Medication</Text>
      <Pressable onPress={() => router.push('/medication/new')}>
        <Text>Presionar</Text>
      </Pressable>
    </View>
  );
};

export default IndexMedication;
