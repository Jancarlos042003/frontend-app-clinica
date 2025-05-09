import { Dimensions, Text, View } from 'react-native';

import type { CarouselItem } from '../data/carouselData';

const { width } = Dimensions.get('window');

type RenderItemProps = {
  item: CarouselItem;
};

const RenderItem = ({ item }: RenderItemProps) => (
  <View style={{ width }} className="flex-1 items-center justify-center px-5">
    <View className="items-center">
      <View className="mb-6 h-40 w-40 items-center justify-center rounded-full">{item.icon}</View>
      <Text className="mb-3 text-center text-2xl font-bold text-[#101010]">{item.title}</Text>
      <Text className="text-center text-base text-[#101010]">{item.description}</Text>
    </View>
  </View>
);

export default RenderItem;
