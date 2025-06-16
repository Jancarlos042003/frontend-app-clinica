import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CancelIcon, CheckIcon } from '../icons/icons';

type SaveCancelButtonsProps = {
  handleCancel: () => void;
  handleSave: () => void;
};

const SaveCancelButtons = ({ handleCancel, handleSave }: SaveCancelButtonsProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={handleCancel}>
        <CancelIcon color="#d32b3b" size={23} />
      </Pressable>

      <Pressable onPress={handleSave}>
        <CheckIcon color="#319821" size={23} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 12, // Si tu versión de RN no soporta gap, usa marginRight en el primer botón
  },
});

export default SaveCancelButtons;
