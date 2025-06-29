import React from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Notes = ({ notas, setNotas, modoEdicion, setModoEdicion }) => (
  <Modal visible={modoEdicion} transparent animationType="fade" onRequestClose={() => setModoEdicion(false)}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Editar notas</Text>
        <TextInput
          style={styles.input}
          multiline
          value={notas}
          onChangeText={setNotas}
        />
        <TouchableOpacity style={styles.btn} onPress={() => setModoEdicion(false)}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
  modalContent: { backgroundColor: 'white', padding: 24, borderRadius: 12, width: '80%' },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, minHeight: 80, padding: 8, marginBottom: 16 },
  btn: { backgroundColor: '#0F172A', borderRadius: 8, padding: 12, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
});

export default Notes;