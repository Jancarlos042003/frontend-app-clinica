import { Text, View } from 'react-native';

import CardContainer from './CardContainer';
import Badge, { StateSymptom } from '../badge/Badge';

type CardSymptomProps = {
  symptom: string;
  date: string;
  intensity: StateSymptom;
  notes: string;
};

const CardSymptom = ({ symptom, date, intensity, notes }: CardSymptomProps) => {
  return (
    <CardContainer onPress={() => 'Card presionado'}>
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold">{symptom}</Text>
        <Badge content={intensity} state={intensity} />
      </View>
      <Text className="text-base">{date}</Text>
      <Text className="mt-3 text-base">{notes}</Text>
    </CardContainer>
  );
};

export default CardSymptom;