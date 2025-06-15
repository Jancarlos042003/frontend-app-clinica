import { useRef } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  loading?: boolean;
  text?: string;
}

const SubmitButton = ({ onPress, loading = false, text = 'Iniciar sesión' }: SubmitButtonProps) => {
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
      disabled={loading}
      style={styles.pressable}>
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleAnim }],
            backgroundColor: loading ? '#65a5cb' : '#32729F',
          },
          styles.animatedView,
        ]}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{text}</Text>}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 4,
  },
  animatedView: {
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 8,
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SubmitButton;
