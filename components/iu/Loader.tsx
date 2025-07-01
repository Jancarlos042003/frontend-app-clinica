import { useRef, useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { LoaderIcon } from '../icons/icons';

type LoaderProps = {
  message?: string;
};

const Loader = ({ message = 'Cargando...' }: LoaderProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <LoaderIcon size={30} color="#32729F" />
      </Animated.View>
      <Text className="italic text-primary">{message}</Text>
    </View>
  );
};

export default Loader;
