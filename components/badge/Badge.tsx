import { Text, View } from 'react-native';
import { TreatmentRecordStatus } from '../../schemas/TreatmentRecordSchema';
import { SymptomStatus } from '../../schemas/SymptomSchema';

type BadgeStatus = SymptomStatus | TreatmentRecordStatus;

type BadgeProps = {
  content: string;
  status: BadgeStatus;
};

// Record es un tipo genérico de TypeScript que permite crear un tipo de objeto
// donde todas las claves (keys) son de un tipo específico y todos los valores son de otro tipo específico.
const colorMap: Record<BadgeStatus, { bg: string; text: string }> = {
  Leve: { bg: 'bg-yellow-200', text: 'text-yellow-800' },
  Moderada: { bg: 'bg-orange-200', text: 'text-orange-800' },
  Severa: { bg: 'bg-red-200', text: 'text-red-800' },
  activo: { bg: 'bg-blue-200', text: 'text-blue-800' },
  completado: { bg: 'bg-green-200', text: 'text-green-800' },
  cancelado: { bg: 'bg-gray-200', text: 'text-gray-800' },
};

const Badge = ({ content, status }: BadgeProps) => {
  const { bg, text } = colorMap[status];
  const formattedContent: string = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();

  return (
    <View className={`flex items-center justify-center rounded-xl px-3 py-1 ${bg}`}>
      <Text className={`text-center text-xs font-bold ${text}`}>{formattedContent}</Text>
    </View>
  );
};

export default Badge;
