import { Text, View } from 'react-native';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <View className="mb-3 border-b-2 border-primary">
      <Text className="text-xl font-bold text-primary">{title}</Text>
    </View>
  );
};

export default Title;
