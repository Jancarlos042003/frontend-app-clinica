import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './app/(tabs)/home';
import DetallesCita from './app/(tabs)/DetallesCita';

type Cita = {
  especialidad: string;
  doctor: string;
  fecha: string;
  hora: string;
  lugar: string;
};

export type RootStackParamList = {
  Home: undefined; 
  DetallesCita: { cita: Cita }; 
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetallesCita" component={DetallesCita} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
