import { Text, View } from 'react-native';

import CardContainer from './CardContainer';
import Badge from '../badge/Badge';
import { SymptomStatus } from 'schemas/SymptomSchema';

type CardSymptomProps = {
  symptom: string;
  date: string;
  intensity: SymptomStatus;
  notes: string;
};

const CardSymptom = ({ symptom, date, intensity, notes }: CardSymptomProps) => {
  return (
    <CardContainer onPress={() => 'Card presionado'}>
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold">{symptom}</Text>
        <Badge content={intensity} status={intensity} />
      </View>
      <Text className="text-base">{date}</Text>
      {notes.length === 0 ? (
        <Text className="mt-3 text-base italic text-gray-600">No se agregaron notas</Text>
      ) : (
        <Text className="mt-3 text-base">{notes}</Text>
      )}
    </CardContainer>
  );
};

export default CardSymptom;
