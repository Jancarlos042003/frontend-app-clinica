import React from 'react';
import { Pressable, View } from 'react-native';

import { CancelIcon, CheckIcon } from '../icons/icons';

type SaveCancelButtonsProps = {
  handleCancel: () => void;
  handleSave: () => void;
};

const SaveCancelButtons = ({ handleCancel, handleSave }: SaveCancelButtonsProps) => {
  return (
    <View className="absolute right-4 top-4 flex-row gap-3">
      <Pressable onPress={handleCancel}>
        <CancelIcon color="#d32b3b" size={23} />
      </Pressable>

      <Pressable onPress={handleSave}>
        <CheckIcon color="#319821" size={23} />
      </Pressable>
    </View>
  );
};

export default SaveCancelButtons;
