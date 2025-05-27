import { Eye, EyeOff } from 'components/icons/icons';
import { Pressable } from 'react-native';

const TogglePasswordButton = ({
  showPassword,
  onToggle,
}: {
  showPassword: boolean;
  onToggle: () => void;
}) => {
  return (
    <Pressable className="absolute right-4 top-4" onPress={onToggle}>
      {showPassword ? <Eye size={24} color="#32729F" /> : <EyeOff size={24} color="#32729F" />}
    </Pressable>
  );
};

export default TogglePasswordButton;
