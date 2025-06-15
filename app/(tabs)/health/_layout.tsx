import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const _HealthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Mi Salud',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
          headerTintColor: '#fff', // Define el color del icono de retroceso
        }}
      />

      <Stack.Screen
        name="symptoms/index"
        options={{
          headerTitle: 'Síntomas Diarios',
          headerStyle: { backgroundColor: '#32729F' },
          headerTintColor: '#fff',
          headerShadowVisible: false,
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />

      <Stack.Screen
        name="treatments/index"
        options={{
          headerTitle: 'Tratamientos Médicos',
          headerStyle: { backgroundColor: '#32729F' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />
    </Stack>
  );
};

export default _HealthLayout;
