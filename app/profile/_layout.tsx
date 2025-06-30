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
          headerTitleStyle: { color: '#fff', fontWeight: 'bold', fontSize: 19 },
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
      <Stack.Screen
        name="modal-edit-tolerance"
        options={{
          title: 'Editar ventana de tolerancia',
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackground: () => <HeaderBackgroundWithBorder />,
        }}
      />
      <Stack.Screen
        name="modal-edit-frequency"
        options={{
          title: 'Editar frecuencia de recordatorio',
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackground: () => <HeaderBackgroundWithBorder />,
        }}
      />
      <Stack.Screen
        name="modal-edit-attempts"
        options={{
          title: 'Editar máximo de intentos',
          presentation: 'modal',
          headerShadowVisible: false,
          headerBackground: () => <HeaderBackgroundWithBorder />,
        }}
      />
    </Stack>
  );
}
