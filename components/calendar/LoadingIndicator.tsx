import React from 'react';
import { View, Text } from 'react-native';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <View className="absolute bottom-1 left-0 right-0 items-center">
      <View className="rounded-full bg-black/10 px-3 py-1">
        <Text className="text-xs text-gray-600">Cargando...</Text>
      </View>
    </View>
  );
};

export default LoadingIndicator;
