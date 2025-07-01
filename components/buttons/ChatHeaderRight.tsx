import type React from 'react';
import { TouchableOpacity } from 'react-native';

import { PlusCircleIcon } from '../icons/icons';

const ChatHeaderRight = () => {
  const onHistoryPress = () => {
    console.log('History button pressed');
    // Add your history button logic here
  };

  return (
    <TouchableOpacity onPress={onHistoryPress} className="flex-row items-center rounded-lg">
      <PlusCircleIcon color="white" size={25.5} />
    </TouchableOpacity>
  );
};

export default ChatHeaderRight;
