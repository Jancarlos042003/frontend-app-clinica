import { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, Text } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  loading?: boolean;
  text?: string;
  className?: string;
}

const SubmitButton = ({
  onPress,
  loading = false,
  text = 'Iniciar sesión',
  className = '',
}: SubmitButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 10,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={loading}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
        className={`items-center rounded-lg py-5 ${loading ? 'bg-primary_300' : 'bg-primary'} ${className}`}>
        {loading ? (
          <ActivityIndicator color="#65a5cb" />
        ) : (
          <Text className="text-lg font-bold text-white">{text}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default SubmitButton;
