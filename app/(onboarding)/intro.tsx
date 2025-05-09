import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RenderItem from '../../components/RenderItem';
import { carouselData } from '../../data/carouselData';

const { width } = Dimensions.get('window');

export default function Intro() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < carouselData.length - 1) {
      const nextIndex: number = currentIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      router.push('dni-verification');
    }
  };

  const handleSkip = () => {
    router.push('dni-verification');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EDEFFC]">
      <View className="flex-1">
        <View className="flex-1 justify-center">
          <FlatList
            ref={flatListRef}
            data={carouselData}
            renderItem={({ item }) => <RenderItem item={item} />}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onMomentumScrollEnd={(event) => {
              const index: number = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(index);
            }}
            snapToInterval={width}
            decelerationRate={0.8}
          />
        </View>

        <View className="mb-8 items-center">
          <View className="mb-8 flex-row space-x-2">
            {carouselData.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-[#4C4DDC]' : 'bg-[#D4D4D8]'}`}
              />
            ))}
          </View>

          <View className="flex-row justify-end p-4">
            <Pressable onPress={handleSkip}>
              <Text className="text-base font-semibold text-[#4C4DDC]">Saltar</Text>
            </Pressable>
          </View>

          <Pressable className="rounded-full bg-[#4C4DDC] px-12 py-4" onPress={handleNext}>
            <Text className="text-base font-semibold text-white">
              {currentIndex === carouselData.length - 1 ? 'Comenzar' : 'Siguiente'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
