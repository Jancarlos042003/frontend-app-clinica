import { Stack } from 'expo-router';

const OnboardingLayout = () => {
  return (
    <Stack
      initialRouteName="start" // Ruta inicial del onboarding
      screenOptions={{
        headerShown: false, // Oculta encabezados por defecto en este grupo
      }}
    />
  );
};

export default OnboardingLayout;
