import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';

import { DropdownOption } from '../../utils/medicationOptions';

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const Dropdown = ({
  label,
  options,
  value,
  onSelect,
  placeholder = 'Seleccionar...',
  error,
  required = false,
}: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-bold text-gray-700">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>

      <Pressable
        onPress={() => setIsVisible(true)}
        className={`rounded-lg border p-4 ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>
        <Text className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </Pressable>

      {error && <Text className="mt-1 text-sm text-red-500">{error}</Text>}

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}>
        <Pressable
          className="flex-1 items-center justify-center bg-black/50"
          onPress={() => setIsVisible(false)}>
          <View className="mx-4 max-h-80 w-80 rounded-lg bg-white">
            <View className="border-b border-gray-200 p-4">
              <Text className="text-center text-lg font-semibold">{label}</Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  className="border-b border-gray-100 px-4 py-3"
                  onPress={() => {
                    onSelect(item.value);
                    setIsVisible(false);
                  }}>
                  <Text className="text-base text-gray-900">{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
