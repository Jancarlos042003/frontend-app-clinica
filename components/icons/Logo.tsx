import { StyleSheet, Text, View } from 'react-native';

import { LogoIcon } from './icons';

const Logo = () => {
  return (
    <View style={styles.row}>
      <View style={styles.shadow}>
        <LogoIcon size={100} color="#FFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Medi+</Text>
        <Text style={styles.subtitle}>Contigo, siempre</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  textContainer: {
    paddingLeft: 8,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.9)',
  },
});

export default Logo;
