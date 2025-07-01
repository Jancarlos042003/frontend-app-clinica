import ChatHeaderLeft from 'components/buttons/ChatHeaderLeft';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatHeaderRight from '../../components/buttons/ChatHeaderRight';
import UserProfile from '../../components/buttons/UserProfile';
import Welcome from '../../components/headers/Welcome';
import { Calendar, Health, Home, Message } from '../../components/icons/icons';

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          borderTopWidth: 0,
          height: (Platform.OS === 'android' ? 70 : 60) + insets.bottom, // Agregar el bottom inset
          paddingTop: 7,
          paddingBottom: insets.bottom, // Espacio para la barra del sistema
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
          bottom: 0, // Asegurar que esté en el bottom
          left: 0,
          right: 0,
          overflow: 'hidden', // Evitar que el contenido se desborde
        },
        tabBarActiveTintColor: '#4189b6',
        tabBarInactiveTintColor: '#7f7f83',
        tabBarLabelStyle: {
          fontSize: 11,
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
            <BlurView tint="dark" intensity={50} style={StyleSheet.absoluteFill} /> // Usar BlurView para iOS
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
          headerTitle: 'Mi Salud',
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
          headerLeft:
            Platform.OS === 'ios'
              ? () => (
                  <View className="ml-4">
                    <ChatHeaderLeft />
                  </View>
                )
              : undefined,
          headerRight:
            Platform.OS === 'ios'
              ? () => (
                  <View className="mr-4">
                    <ChatHeaderRight />
                  </View>
                )
              : () => (
                  <View className="mr-4 flex-row items-center gap-5">
                    <ChatHeaderLeft />
                    <ChatHeaderRight />
                  </View>
                ),
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
