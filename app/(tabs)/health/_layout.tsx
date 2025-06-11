import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const _HealthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="symptoms/index"
        options={{
          title: 'Síntomas Diarios',
          headerStyle: { backgroundColor: 'transparent' },
          headerTintColor: '#000',
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />

      <Stack.Screen
        name="treatments/index"
        options={{
          title: 'Tratamientos Médicos',
          headerStyle: { backgroundColor: 'transparent' },
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerTintColor: '#000',
          ...(Platform.OS === 'ios' ? { animation: 'default' } : { animation: 'slide_from_right' }),
        }}
      />
    </Stack>
  );
};

export default _HealthLayout;
