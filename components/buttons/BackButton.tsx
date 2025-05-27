import { Pressable } from 'react-native';

import { ArrowBack } from '../icons/icons';

type BackButtonProps = {
  onPress: () => void;
  color?: string;
  size?: number;
};

const BackButton = ({ onPress, color = '#32729F', size = 24 }: BackButtonProps) => {
  return (
    <Pressable className="mb-6" onPress={onPress}>
      <ArrowBack size={size} color={color} />
    </Pressable>
  );
};

export default BackButton;
