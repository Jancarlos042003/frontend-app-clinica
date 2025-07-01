import { ReactNode } from 'react';
import { Text, View } from 'react-native';

export type ProfileDisplayProps = {
  icon: ReactNode;
  title: string;
  content: string;
  subtitle?: string;
};

const UserProfileInfo = ({ icon, title, content, subtitle }: ProfileDisplayProps) => {
  return (
    <View className="w-full flex-row items-center">
      <View className="w-12">{icon}</View>
      <View>
        <Text className="text-lg font-bold text-primary">{title}</Text>
        <Text className="text-base">
          {content.toLowerCase() === 'null' ? 'No registrado' : content}
        </Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
    </View>
  );
};

export default UserProfileInfo;
