import { View, Text } from 'react-native';
import { Symptom } from '~/types/symptom';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AlignLeftIcon,
  Calendar,
  FaceGrimaceIcon,
  FaceMehIcon,
  FaceSadTearIcon,
} from '../icons/icons';
import { StateSymptom } from '../../constants/constants';

type SymptomInfoCardProps = {
  symptom: Symptom;
};

const SymptomInfoCard = ({ symptom }: SymptomInfoCardProps) => {
  const colors = getSymptomColor[symptom.intensity as StateSymptom] || getSymptomColor['Leve'];

  return (
    <View className="mb-3 overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header con color de intensidad */}
      <View className="px-4 py-3" style={{ backgroundColor: colors.backgroundColor }}>
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-lg font-bold" style={{ color: colors.color }} numberOfLines={1}>
              {symptom.symptom}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text
              className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold"
              style={{ color: colors.color }}>
              {symptom.intensity}
            </Text>
            <View className="rounded-full bg-white/20 p-1.5">
              <SymptomFace intensity={symptom.intensity} />
            </View>
          </View>
        </View>
      </View>

      {/* Contenido principal */}
      <View className="px-4 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Calendar size={16} color="#64748b" />
            <Text className="text-sm font-medium text-gray-600">{symptom.date}</Text>
          </View>

          {symptom.notes && (
            <View className="ml-4 flex-1">
              <View className="flex-row items-start gap-1.5">
                <AlignLeftIcon size={16} color="#64748b" />
                <Text className="flex-1 text-sm italic text-gray-500" numberOfLines={2}>
                  {symptom.notes}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SymptomInfoCard;

type SymptomColor = {
  backgroundColor: string;
  color: string;
};

const getSymptomColor: Record<StateSymptom, SymptomColor> = {
  Leve: {
    backgroundColor: '#fdf277',
    color: '#92400e',
  },
  Moderada: {
    backgroundColor: '#fed7aa',
    color: '#c2410c',
  },
  Severa: {
    backgroundColor: '#fecaca',
    color: '#dc2626',
  },
};

const SymptomFace = ({ intensity }: { intensity: StateSymptom }) => {
  switch (intensity) {
    case 'Leve':
      return <FaceMehIcon size={20} color={getSymptomColor.Leve.color} />;
    case 'Moderada':
      return <FaceGrimaceIcon size={20} color={getSymptomColor.Moderada.color} />;
    case 'Severa':
      return <FaceSadTearIcon size={20} color={getSymptomColor.Severa.color} />;
    default:
      return <FaceMehIcon size={20} color="#2563eb" />;
  }
};
