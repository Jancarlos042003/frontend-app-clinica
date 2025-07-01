import React from 'react';
import { Pressable } from 'react-native';

import { EditIcon } from '../icons/icons';

type EditButtonProps = {
  onToggle: () => void;
};

const EditButton = ({ onToggle }: EditButtonProps) => {
  return (
    <Pressable className="absolute right-4 top-4" onPress={onToggle}>
      <EditIcon color="#000" size={21} />
    </Pressable>
  );
};

export default EditButton;
