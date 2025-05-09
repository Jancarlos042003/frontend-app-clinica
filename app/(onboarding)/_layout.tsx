import { Stack } from 'expo-router';

const OnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Oculta encabezados por defecto en este grupo
      }}
    />
  );
};

export default OnboardingLayout;
