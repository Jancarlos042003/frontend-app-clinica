import React from 'react';
import { Pressable, View, Text } from 'react-native';

import { EmergencyContact } from '../../types/settings';
import { ContactsIcon, TrashIcon } from '../icons/icons';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onPress: () => void;
  onDelete?: () => void;
}

const EmergencyContactCard: React.FC<EmergencyContactCardProps> = ({
  contact,
  onPress,
  onDelete,
}) => {
  return (
    <Pressable onPress={onPress} className="rounded-xl bg-green-50 p-4 active:bg-green-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3 rounded-full bg-green-100 p-2">
            <ContactsIcon color="#10B981" size={24} />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-primary">{contact.name}</Text>
            {contact.relationship && (
              <Text className="text-base font-semibold text-gray-800">{contact.relationship}</Text>
            )}
            <Text className="text-sm text-gray-600">{contact.phoneNumber}</Text>
          </View>
        </View>

        {onDelete && (
          <Pressable
            onPress={onDelete}
            className="ml-3 rounded-full bg-red-100 p-2 active:bg-red-200">
            <TrashIcon color="#EF4444" size={20} />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default EmergencyContactCard;
