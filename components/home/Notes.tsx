import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NotesProps {
  notas: string;
  setNotas: (text: string) => void;
  modoEdicion: boolean;
  setModoEdicion: (value: boolean) => void;
}

const Notes: React.FC<NotesProps> = ({ notas, setNotas, modoEdicion, setModoEdicion }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      multiline
      editable={modoEdicion}
      value={notas}
      onChangeText={setNotas}
    />
    <TouchableOpacity onPress={() => setModoEdicion(!modoEdicion)}>
      <Text style={styles.buttonText}>{modoEdicion ? 'Guardar' : 'Editar'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  buttonText: {
    color: 'blue',  
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Notes;

