import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import { UserCircle } from '../icons/icons';

const UserProfile = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile/');
  };

  return (
    <Pressable onPress={handlePress} className="mr-4">
      <UserCircle size={28} color="#ffffff" />
    </Pressable>
  );
};

export default UserProfile;
