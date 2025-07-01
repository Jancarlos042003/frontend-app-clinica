import { PlusCircleIcon } from 'components/icons/icons';
import { Pressable, Text } from 'react-native';

type AddButtonProps = {
  onPress?: () => void;
  label?: string;
  className?: string;
};

const AddButton = ({ onPress, label, className }: AddButtonProps) => {
  return (
    <Pressable
      className={
        className
          ? `${className}`
          : 'flex-row items-center justify-center rounded-full bg-primary p-3'
      }
      onPress={onPress}>
      <PlusCircleIcon color="#fff" size={24} />
      {label && <Text className="ml-2 font-medium text-white">{label}</Text>}
    </Pressable>
  );
};

export default AddButton;
