import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';

interface Medicamento {
  id: string | number;
  nombre: string;
  hora: string;
  tomado: boolean;
  color?: string;
}

interface MedicationCardProps {
  medicamento: Medicamento;
  toggleTomado: (id: string | number) => void;
  eliminarMedicamento: (id: string | number) => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medicamento, toggleTomado, eliminarMedicamento }) => (
  <View style={styles.card}>
    <View style={styles.infoContainer}>
      <View style={[styles.circle, { backgroundColor: medicamento.tomado ? 'green' : medicamento.color || 'yellow' }]} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{medicamento.nombre}</Text>
        <Text style={styles.time}>{medicamento.hora}</Text>
      </View>
    </View>

    {/* Confirmación o mensaje de pendiente */}
    {medicamento.tomado ? (
      <Text style={styles.confirmation}>Confirmado a las {medicamento.hora}</Text>
    ) : (
      <Text style={styles.pending}>Pendiente</Text>
    )}

    {/* Acciones: Marcar como tomado y eliminar */}
    <View style={styles.actions}>
      <TouchableOpacity onPress={() => toggleTomado(medicamento.id)} accessibilityLabel={`Marcar ${medicamento.nombre} como tomado`}>
        <Check color={medicamento.tomado ? 'green' : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => eliminarMedicamento(medicamento.id)} accessibilityLabel={`Eliminar ${medicamento.nombre}`}>
        <Trash2 color="red" />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    color: '#0F172A',
  },
  time: {
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmation: {
    marginTop: 5,
    color: 'green',
    fontSize: 12,
  },
  pending: {
    marginTop: 5,
    color: 'red',
    fontSize: 12,
  },
});

export default MedicationCard;


