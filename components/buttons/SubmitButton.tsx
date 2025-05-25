import { ActivityIndicator, Pressable, Text } from 'react-native';

interface SubmitButtonProps {
  onPress: () => void;
  loading?: boolean;
  text?: string;
  className?: string;
}

const SubmitButton = ({
  onPress,
  loading = false,
  text = 'Iniciar sesión',
  className = '',
}: SubmitButtonProps) => {
  return (
    <Pressable
      className={`items-center rounded-lg py-5 active:bg-primary_500 ${loading ? 'bg-primary_300' : 'bg-primary'} ${className}`}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#65a5cb" />
      ) : (
        <Text className="text-lg font-bold text-white">{text}</Text>
      )}
    </Pressable>
  );
};

export default SubmitButton;
