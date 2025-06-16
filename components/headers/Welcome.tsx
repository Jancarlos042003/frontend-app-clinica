import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useUser } from '../../hooks/useUser';

const Welcome = () => {
  const { user } = useUser();
  const name: string = user?.name || '';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido {name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Welcome;
