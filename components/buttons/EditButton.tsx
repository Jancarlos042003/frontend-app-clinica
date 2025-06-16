import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { EditIcon } from '../icons/icons';

type EditButtonProps = {
  onToggle: () => void;
};

const EditButton = ({ onToggle }: EditButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onToggle}>
      <EditIcon color="#000" size={21} />
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

export default EditButton;
