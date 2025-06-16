import { Pressable, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface RegisterSectionProps {
  onPress: () => void;
  questionText?: string;
  actionText?: string;
  // Estilos para el contenedor principal
  containerStyle?: ViewStyle;
  // Estilos para el texto de la pregunta
  questionTextStyle?: TextStyle;
  // Estilos para el botón
  buttonStyle?: ViewStyle;
  // Estilos para el texto del botón
  actionTextStyle?: TextStyle;
}

const RegisterSection = ({
  onPress,
  questionText = '¿No tienes una cuenta?',
  actionText = 'Regístrate',
  containerStyle,
  questionTextStyle,
  buttonStyle,
  actionTextStyle,
}: RegisterSectionProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.questionText, questionTextStyle]}>{questionText}</Text>
      <Pressable style={[styles.pressable, buttonStyle]} onPress={onPress}>
        <Text style={[styles.actionText, actionTextStyle]}>{actionText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#222',
  },
  pressable: {
    paddingHorizontal: 8,
  },
  actionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#32729F',
  },
});

export default RegisterSection;
