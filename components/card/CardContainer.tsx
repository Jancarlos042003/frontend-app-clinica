import { ReactNode, useRef } from 'react';
import { Animated, Pressable } from 'react-native';

type CardHealthProps = {
  children: ReactNode;
  onPress: () => void;
};

const CardContainer = ({ children, onPress }: CardHealthProps) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const animatedOpacity = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const animatedBackground = opacityAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f5f5f5', '#e7e7e7'],
  });

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          backgroundColor: animatedBackground,
          opacity: animatedOpacity,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#d1d5db',
          padding: 20,
        }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default CardContainer;
