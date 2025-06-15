import { Stack } from 'expo-router';
import React from 'react';

const SymptomLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="new"
        options={{
          headerTitle: 'Nuevo Síntoma',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
};

export default SymptomLayout;
