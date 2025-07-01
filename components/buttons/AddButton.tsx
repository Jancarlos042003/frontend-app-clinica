import { PlusCircleIcon } from 'components/icons/icons';
import { Pressable } from 'react-native';

type AddButtonProps = {
  onPress?: () => void;
};

const AddButton = ({ onPress }: AddButtonProps) => {
  return (
    <Pressable className="rounded bg-primary px-3 py-2" onPress={onPress}>
      <PlusCircleIcon color="#fff" size={24} />
    </Pressable>
  );
};

export default AddButton;
