import { StyleSheet, Text, View } from 'react-native';

import { getPasswordStrength, Strength } from '../../utils/auth/getPasswordStrength';

const PasswordStrengthIndicator = ({ value }: { value: string }) => {
  const passwordStrength: Strength = getPasswordStrength(value);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, { color: passwordStrength.textColor }]}>Seguridad:</Text>
        <Text style={[styles.text, { color: passwordStrength.textColor }]}>
          {passwordStrength.label}
        </Text>
      </View>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              backgroundColor: passwordStrength.color,
              width: `${(passwordStrength.strength / 5) * 100}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  row: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
  },
  barBackground: {
    height: 4,
    overflow: 'hidden',
    borderRadius: 9999,
    backgroundColor: '#D4D4D8',
  },
  barFill: {
    height: '100%',
    borderRadius: 9999,
  },
});

export default PasswordStrengthIndicator;
