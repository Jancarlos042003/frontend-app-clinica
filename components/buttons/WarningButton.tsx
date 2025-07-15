import { useRef } from 'react';
import { Text, Pressable, Animated } from 'react-native';

type WarningButtonProps = {
  onPress: () => void;
  title: string;
};

const WarningButton = ({ onPress, title }: WarningButtonProps) => {
  const animScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(animScale, {
      toValue: 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animScale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: animScale }] }}>
      <Pressable
        className="rounded-lg bg-red-500 py-4"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}>
        <Text className="text-center font-semibold text-white">{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default WarningButton;
