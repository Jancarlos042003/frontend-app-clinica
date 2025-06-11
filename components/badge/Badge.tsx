import { Text, View } from 'react-native';

export type StateSymptom = 'leve' | 'moderado' | 'severo' | 'activo' | 'completado';

type BadgeProps = {
  content: string;
  state: StateSymptom;
};

// Record es un tipo genérico de TypeScript que permite crear un tipo de objeto
// donde todas las claves (keys) son de un tipo específico y todos los valores son de otro tipo específico.
const colorMap: Record<StateSymptom, { bg: string; text: string }> = {
  leve: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  moderado: { bg: 'bg-orange-200', text: 'text-orange-800' },
  severo: { bg: 'bg-red-200', text: 'text-red-800' },
  activo: { bg: 'bg-blue-200', text: 'text-blue-800' },
  completado: { bg: 'bg-green-200', text: 'text-green-800' },
};

const Badge = ({ content, state }: BadgeProps) => {
  const { bg, text } = colorMap[state];
  const formattedContent: string = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();

  return (
    <View className={`flex items-center justify-center rounded-xl px-3 py-1 ${bg}`}>
      <Text className={`text-center text-xs font-bold ${text}`}>{formattedContent}</Text>
    </View>
  );
};

export default Badge;
