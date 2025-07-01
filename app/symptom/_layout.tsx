import { Stack } from 'expo-router';

const SymptomLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Síntomas',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerLargeTitle: true,
          headerTransparent: false, // Importante
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          headerTitle: 'Nuevo Síntoma',
          headerStyle: { backgroundColor: '#32729F' },
          headerTitleStyle: { color: '#fff' },
          headerShadowVisible: false,
          headerTintColor: '#fff',
          headerLargeTitle: true,
          headerTransparent: false, // Importante
        }}
      />
    </Stack>
  );
};

export default SymptomLayout;
