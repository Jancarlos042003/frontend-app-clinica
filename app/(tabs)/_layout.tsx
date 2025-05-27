import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Calendar, Home, Message } from '../../components/icons/icons';

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          elevation: 0, // Ya que en android viene con elevation: 8 por defecto
          borderTopWidth: 0,
          height: 81,
          paddingTop: 10,
          marginHorizontal: 7,
          marginBottom: 7,
          borderRadius: 20,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#4189b6',
        tabBarInactiveTintColor: '#7f7f83',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 1,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#4189b6',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        animation: 'fade',
        tabBarBackground: () => (
          <BlurView tint="regular" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Inicio',
          headerTitle: 'Bienvenido',
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
          title: 'Chatbot',
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
