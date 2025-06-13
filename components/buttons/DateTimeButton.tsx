import { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';

type DateButtonProps = {
  title: string;
  icon: ReactNode;
  setShowPicker: (show: boolean) => void;
  formattedDate: string;
};

const DateTimeButton = ({ title, icon, formattedDate, setShowPicker }: DateButtonProps) => {
  return (
    <>
      <Text className="text-xl font-bold text-primary">{title}</Text>
      <Pressable
        onPress={() => setShowPicker(true)}
        className="w-full flex-row items-center rounded-lg border border-gray-300 p-3">
        {icon}
        <Text className="ml-2 text-base">{formattedDate}</Text>
      </Pressable>
    </>
  );
};

export default DateTimeButton;
