import { Pressable, StyleSheet } from 'react-native';

import { ArrowBack } from '../icons/icons';

type BackButtonProps = {
  onPress: () => void;
  color?: string;
  size?: number;
};

const BackButton = ({ onPress, color = '#32729F', size = 24 }: BackButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <ArrowBack size={size} color={color} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 24,
  },
});

export default BackButton;
