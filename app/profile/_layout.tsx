import { Stack } from 'expo-router';
import { Platform } from 'react-native';

import HeaderBackgroundWithBorder from '../../components/headers/HeaderBackgroundWithBorder';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Perfil',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#4189b6' },
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
          headerTintColor: '#fff',
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
