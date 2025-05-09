import { Stack } from 'expo-router';

// Layout raíz de la app con un Stack Navigator
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
