import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Medicamento {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
}

interface Props {
  medicamento: Medicamento;
  onPress: () => void;
}

const MedicationCard: React.FC<Props> = ({ medicamento, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Avatar de usuario opcional */}
      {/* <View style={styles.avatar}>
        <Icon name="user" size={24} color="#0F172A" />
      </View> */}
      <Icon name="clock-o" size={22} color="#0F172A" style={{ marginRight: 10 }} />
      <Text style={styles.nombre}>{medicamento.nombre}</Text>
    </View>
    <Text style={styles.hora}>{medicamento.hora}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0F172A',
  },
  hora: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F2FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});

export default MedicationCard;