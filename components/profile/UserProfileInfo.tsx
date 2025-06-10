import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type ProfileDisplayProps = {
  icon: ReactNode;
  title: string;
  content: string;
};

const UserProfileInfo = ({ icon, title, content }: ProfileDisplayProps) => {
  return (
    <View className="w-full flex-row items-center">
      <View className="w-12">{icon}</View>
      <View>
        <Text className="text-xl font-bold text-primary">{title}</Text>
        <Text className="text-base">
          {content.toLowerCase() === 'null' ? 'No registrado' : content}
        </Text>
      </View>
    </View>
  );
};

export default UserProfileInfo;
