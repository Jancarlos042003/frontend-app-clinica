import '../global.css';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useUser } from '../hooks/useUser';
import { checkAuthStatus } from '../utils/auth/checkAuthStatus';

const Index = () => {
  const router = useRouter();
  const { loginUser } = useUser();

  // Se le pasa router como parametro porque useRouter no se puede
  // utilizar fuera de un componente React
  useEffect(() => {
    checkAuthStatus(loginUser, router);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
