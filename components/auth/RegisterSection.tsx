import { Pressable, Text, View } from 'react-native';

interface RegisterSectionProps {
  onPress: () => void;
  questionText?: string;
  actionText?: string;
  questionTextClassName?: string;
  actionTextClassName?: string;
}

const RegisterSection = ({
  onPress,
  questionText = '¿No tienes una cuenta?',
  questionTextClassName = '',
  actionText = 'Regístrate',
  actionTextClassName = 'text-center text-base font-bold text-primary',
}: RegisterSectionProps) => {
  return (
    <View className="mt-3 flex flex-row items-center justify-center">
      <Text className={questionTextClassName}>{questionText}</Text>
      <Pressable className="px-2" onPress={onPress}>
        <Text className={actionTextClassName}>{actionText}</Text>
      </Pressable>
    </View>
  );
};

export default RegisterSection;
