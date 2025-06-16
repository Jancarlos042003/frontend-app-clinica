import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { UserCircle } from '../icons/icons';

const UserProfile = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile/');
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      <UserCircle size={28} color="#ffffff" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
  },
});

export default UserProfile;
