import type React from 'react';
import { TouchableOpacity } from 'react-native';

import { ClockIcon } from '../icons/icons';

const ChatHeaderLeft = () => {
  const onNewChatPress = () => {
    // Logic to handle new chat creation
    console.log('New chat pressed');
  };

  return (
    <TouchableOpacity onPress={onNewChatPress} className="flex-row items-center rounded-lg">
      <ClockIcon size={25} color="white" />
    </TouchableOpacity>
  );
};

export default ChatHeaderLeft;
