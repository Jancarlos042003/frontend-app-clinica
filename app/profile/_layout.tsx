import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import HeaderBackgroundWithBorder from '../../components/headers/HeaderBackgroundWithBorder';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Perfil',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff' },
          headerTintColor: '#fff', // Define el color del icono de retroceso
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />

      <Stack.Screen
        name="modal-edit-phone"
        options={{
          title: 'Editar teléfono',
          presentation: 'modal',
          headerShadowVisible: false,
          // Fondo personalizado con borde inferior
          headerBackground: () => <HeaderBackgroundWithBorder />,
        }}
      />

      <Stack.Screen
        name="modal-edit-email"
        options={{
          title: 'Editar correo',
          presentation: 'modal',
          headerShadowVisible: false,
          // Fondo personalizado con borde inferior
          headerBackground: () => <HeaderBackgroundWithBorder />,
        }}
      />
    </Stack>
  );
}
