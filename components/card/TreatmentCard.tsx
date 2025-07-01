import Badge from 'components/badge/Badge';
import ProgressBar from 'components/iu/ProgressBar';
import TreatmentInfoRow from 'components/iu/TreatmentInfoRow';
import { useRef } from 'react';
import { View, Text, Animated, Pressable } from 'react-native';
import { TreatmentRecord } from 'schemas/TreatmentRecordSchema';
import CardContainer from './CardContainer';

interface TreatmentCardProps {
  treatment: TreatmentRecord;
}

const TreatmentCard = ({ treatment }: TreatmentCardProps) => {
  const animScale = useRef(new Animated.Value(0)).current;

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${startDate} - ${endDate}`;
  };

  const formatDosageInfo = (dose: string, frequency: string) => {
    return `${dose} ${frequency}`;
  };

  return (
    <CardContainer onPress={() => {}}>
      <View className="mb-2 flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="mb-1 text-lg font-semibold text-gray-900">{treatment.nameMedicine}</Text>
          <Text className="text-sm text-gray-600">
            {formatDosageInfo(treatment.dose, treatment.frequency)}
          </Text>
        </View>
        <Badge status={treatment.status} content={treatment.status} />
      </View>

      <TreatmentInfoRow
        leftLabel="Duración"
        leftValue={treatment.duration}
        rightLabel="Período"
        rightValue={formatDateRange(treatment.startDate, treatment.endDate)}
      />

      <ProgressBar progress={treatment.progress} />
    </CardContainer>
  );
};

export default TreatmentCard;
