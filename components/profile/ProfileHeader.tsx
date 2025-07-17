import { View, Text } from 'react-native';

import { User } from '../../context/UserContext';
import { UserCircle } from '../icons/icons';

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <View className="bg-gradient-to-br from-[#32729F] to-[#4A90C2] px-6 pb-8 pt-12">
      <View className="items-center">
        <View className="mb-4 rounded-full bg-primary_300/40 p-5 shadow-lg">
          <UserCircle color="#32729F" size={80} />
        </View>
        <Text className="text-center text-2xl font-bold text-[#32729F]">
          {user?.name} {user?.lastname}
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
