import { CameraIcon, ImageIcon, PaperClipIcon } from 'components/icons/icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface ImageSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onPickImage: () => void;
}

export const ImageSelectionModal: React.FC<ImageSelectionModalProps> = ({
  visible,
  onClose,
  onTakePhoto,
  onPickImage,
}) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableOpacity activeOpacity={1} onPress={onClose} className="flex-1" />
      <View className="rounded-t-3xl bg-[#2D2D2D] py-8">
        <View className="mb-4 items-center">
          <View className="h-1 w-12 rounded-full bg-gray-400" />
        </View>
        <View className="flex-row justify-evenly px-4 py-6">
          <TouchableOpacity
            onPress={() => {
              onTakePhoto();
              onClose();
            }}
            className="items-center">
            <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-700">
              <CameraIcon size={25} color="white" />
            </View>
            <Text className="text-sm text-white">Cámara</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onPickImage();
              onClose();
            }}
            className="items-center">
            <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-700">
              <ImageIcon size={27} color="white" />
            </View>
            <Text className="text-sm text-white">Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center">
            <View className="mb-2 h-16 w-16 items-center justify-center rounded-full bg-gray-700">
              <PaperClipIcon size={24} color="white" />
            </View>
            <Text className="text-sm text-white">Archivos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
