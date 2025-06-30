import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import ModalContainer from '~/components/modal/ModalContainer';

export default function ModalAddEmergencyContact() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSave = () => {
    if (!name || !phone || !relationship) {
      Alert.alert('Campos requeridos', 'Completa todos los campos.');
      return;
    }
    // Aquí deberías guardar el contacto en el backend o contexto
    router.back();
  };

  return (
    <ModalContainer visible={visible} setVisible={setVisible} handleSubmit={handleSave}>
      <View className="rounded-lg border border-gray-300 bg-white p-6">
        <Text className="mb-4 text-center text-xl font-bold">Agregar contacto de emergencia</Text>
        <View className="mb-4">
          <Text className="mb-1 font-medium">Nombre</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="rounded border px-3 py-2"
            placeholder="Nombre completo"
          />
        </View>
        <View className="mb-4">
          <Text className="mb-1 font-medium">Teléfono</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            className="rounded border px-3 py-2"
            placeholder="Número de teléfono"
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>
        <View className="mb-6">
          <Text className="mb-1 font-medium">Relación</Text>
          <TextInput
            value={relationship}
            onChangeText={setRelationship}
            className="rounded border px-3 py-2"
            placeholder="Ej: Madre, Padre, Amigo..."
          />
        </View>
      </View>
    </ModalContainer>
  );
}
