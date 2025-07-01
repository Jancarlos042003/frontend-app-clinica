import { ReactNode, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

type CardHealthProps = {
  children: ReactNode;
  onPress: () => void;
};

const CardContainer = ({ children, onPress }: CardHealthProps) => {
  const animScale = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animScale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animScale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatedScala = animScale.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.97],
  });

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{ transform: [{ scale: animatedScala }] }}
        className="rounded-lg border border-gray-200 bg-white px-4 py-5 shadow-sm">
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default CardContainer;
