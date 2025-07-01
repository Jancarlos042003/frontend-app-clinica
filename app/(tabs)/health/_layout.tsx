import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const HealthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
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

export default HealthLayout;
