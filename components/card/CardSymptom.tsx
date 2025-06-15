import { StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.rowBetween}>
        <Text style={styles.symptomText}>{symptom}</Text>
        <Badge content={intensity} state={intensity} />
      </View>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.notesText}>{notes}</Text>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 15,
  },
  notesText: {
    marginTop: 12,
    fontSize: 14,
  },
});

export default CardSymptom;
