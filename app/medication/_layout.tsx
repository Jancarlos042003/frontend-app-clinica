import { Stack } from 'expo-router';

const SymptomLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Medicación',
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
          headerTitle: 'Nueva Medicación',
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
