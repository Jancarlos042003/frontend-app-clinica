import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Perfil',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 19 },
          headerTintColor: '#fff', // Define el color del icono de retroceso
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />
    </Stack>
  );
}
