import { Text, StyleSheet } from 'react-native';

interface ValidationErrorProps {
  message?: string;
}

const ValidationError= ({ message }: ValidationErrorProps) => {
  if (!message) return null;
  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    color: "#ef4444"
  },
});

export default ValidationError;
