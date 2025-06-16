import { Eye, EyeOff } from 'components/icons/icons';
import { Pressable, StyleSheet } from 'react-native';

const TogglePasswordButton = ({
  showPassword,
  onToggle,
}: {
  showPassword: boolean;
  onToggle: () => void;
}) => {
  return (
    <Pressable style={styles.button} onPress={onToggle}>
      {showPassword ? <Eye size={24} color="#32729F" /> : <EyeOff size={24} color="#32729F" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
});

export default TogglePasswordButton;
