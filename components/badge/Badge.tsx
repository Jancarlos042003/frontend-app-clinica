import { StyleSheet, Text, View } from 'react-native';

export type StateSymptom = 'leve' | 'moderado' | 'severo' | 'activo' | 'completado';

type BadgeProps = {
  content: string;
  state: StateSymptom;
};

// Record es un tipo genérico de TypeScript que permite crear un tipo de objeto
// donde todas las claves (keys) son de un tipo específico y todos los valores son de otro tipo específico.
const colorMap: Record<StateSymptom, { bg: string; text: string }> = {
  leve: { bg: '#FEF08A', text: '#854D0E' },
  moderado: { bg: '#FED7AA', text: '#9A3412' },
  severo: { bg: '#FCA5A5', text: '#991B1B' },
  activo: { bg: '#BFDBFE', text: '#1E40AF' },
  completado: { bg: '#BBF7D0', text: '#166534' },
};

const Badge = ({ content, state }: BadgeProps) => {
  const { bg, text } = colorMap[state];
  const formattedContent: string = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase();

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{formattedContent}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Badge;
