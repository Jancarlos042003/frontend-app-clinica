import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import CardContainer from '../../../components/card/CardContainer';
import { ActivityIcon } from '../../../components/icons/icons';
import { ScreenWrapper } from '../../../components/layouts/ScreenWrapper';

const Index = () => {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <CardContainer onPress={() => router.push('/(tabs)/health/symptoms/')}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Síntomas Registrados</Text>
            <ActivityIcon color="#000" size={24} />
          </View>
          <View style={styles.col}>
            <Text style={styles.count}>3</Text>
            <Text style={styles.subtitle}>Esta semana</Text>
          </View>
        </CardContainer>

        <CardContainer onPress={() => router.push('/(tabs)/health/treatments/')}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>Tratamientos Registrados</Text>
            <ActivityIcon color="#000" size={24} />
          </View>
          <View style={styles.col}>
            <Text style={styles.count}>3</Text>
            <Text style={styles.subtitle}>1 completado esta semana</Text>
          </View>
        </CardContainer>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
});

export default Index;
