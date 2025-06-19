import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

import { UserCircle } from '../icons/icons';

const UserProfile = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/profile/');
  };

  return (
    <Pressable onPress={handlePress} className="pr-4">
      <UserCircle size={30} color="#ffffff" />
    </Pressable>
  );
};

export default UserProfile;
