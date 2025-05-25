import React from 'react';
import { Keyboard, Pressable } from 'react-native';

type DismissKeyboardViewProps = {
  children: React.ReactNode;
};

// Utilizamos Keyboard.dismiss para ocultar el teclado al presionar fuera de un campo de entrada
const DismissKeyboardView: React.FC<DismissKeyboardViewProps> = ({ children }) => (
  <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
    {children}
  </Pressable>
);

export default DismissKeyboardView;
