import { FC, ReactNode } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

type DismissKeyboardViewProps = {
  children: ReactNode;
};

// Utilizamos Keyboard.dismiss para ocultar el teclado al presionar fuera de un campo de entrada
// pero asegurando que no interfiera con componentes scrolleables
const DismissKeyboardView: FC<DismissKeyboardViewProps> = ({ children }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{ flex: 1 }}>{children}</View>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
