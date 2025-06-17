import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserProfile from '../../components/buttons/UserProfile';
import Welcome from '../../components/headers/Welcome';
import { Calendar, Health, Home, Message } from '../../components/icons/icons';

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          // Para permitir que el BlurView se vea correctamente detrás de la barra de navegación.
          // En android no es necesario porque no se usaBlurView, pero mantenerlo ayuda a un diseño más consistente entre plataformas.
          position: 'absolute',
          elevation: 0,
          borderTopWidth: 0,
          // Definimos el alto del tabBar
          height: (Platform.OS === 'android' ? 70 : 60) + insets.bottom, // Agregamos el espacio de la barra de navegación del sistema
          paddingTop: 7,
          paddingBottom: insets.bottom, // Espacio para la barra de navegación del sistema
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.5,
            },
            android: {
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }),
          bottom: 0, // Asegurar que esté en la parte inferior y que ocupe el ancho de la pantalla
          left: 0,
          right: 0,
          overflow: 'hidden', // Evitar que el contenido se desborde
        },
        tabBarActiveTintColor: '#4189b6',
        tabBarInactiveTintColor: '#7f7f83',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 1,
          marginBottom: insets.bottom > 0 ? 5 : 0, // Ajuste extra para iOS
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#32729F',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        animation: 'fade',
        tabBarBackground: () =>
          Platform.OS === 'ios' ? (
            <BlurView tint="regular" intensity={50} style={StyleSheet.absoluteFill} /> // Usar BlurView para iOS
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: '#afafaf' }]} /> // Color sólido de fondo para Android
          ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          headerTitle: '',
          headerLeft: () => <Welcome />,
          headerRight: () => <UserProfile />,
          tabBarIcon: ({ color, focused }) => (
            <Home
              color={color}
              size={focused ? 27 : 26}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Mi Salud',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Health
              color={color}
              size={focused ? 27 : 26}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendario',
          headerTitle: 'Mi Calendario',
          tabBarIcon: ({ color, focused }) => (
            <Calendar
              color={color}
              size={focused ? 27 : 26}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Medibot',
          headerTitle: 'Asistente Virtual',
          tabBarIcon: ({ color, focused }) => (
            <Message
              color={color}
              size={focused ? 27 : 26}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
