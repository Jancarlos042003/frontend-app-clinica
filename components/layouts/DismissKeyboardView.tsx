import { FC, ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

type DismissKeyboardViewProps = {
  children: ReactNode;
};

// Utilizamos Keyboard.dismiss para ocultar el teclado al presionar fuera de un campo de entrada
const DismissKeyboardView: FC<DismissKeyboardViewProps> = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
