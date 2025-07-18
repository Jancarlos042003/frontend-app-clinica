import React from 'react';
import { View, Text } from 'react-native';

import AddButton from '../buttons/AddButton';

interface EmptyStateCardProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  onAdd?: () => void;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  title,
  description,
  buttonLabel,
  onAdd,
}) => {
  return (
    <View className="w-full items-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <Text className="mb-2 text-center text-lg font-semibold text-gray-700">{title}</Text>
      {description ? (
        <Text className="mb-4 text-center text-sm text-gray-400">{description}</Text>
      ) : null}
      {buttonLabel && onAdd ? <AddButton label={buttonLabel} onPress={onAdd} /> : null}
    </View>
  );
};

export default EmptyStateCard;
