import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpIcon, PlusIcon } from 'components/icons/icons';
import { ImageSelectionModal } from 'components/modal';
import * as ImagePicker from 'expo-image-picker';
import type React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { z } from 'zod';

const chatInputSchema = z.object({
  message: z
    .string()
    .min(1, 'El mensaje no puede estar vacío')
    .max(1000, 'El mensaje es demasiado largo'),
});

type ChatInputForm = z.infer<typeof chatInputSchema>;

interface ChatInputProps {
  onSendMessage: (message: string, imageUri?: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [height, setHeight] = useState(40); // altura mínima
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ChatInputForm>({
    resolver: zodResolver(chatInputSchema),
    mode: 'onChange',
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = (data: ChatInputForm) => {
    if (!isValid || disabled) return;

    onSendMessage(data.message.trim(), selectedImage || undefined);
    reset();
    setSelectedImage(null);
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false, // Cambiado a false para evitar recortes automáticos
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Necesitamos permisos para acceder a tu cámara');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <ImageSelectionModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        onTakePhoto={takePhoto}
        onPickImage={pickImage}
      />

      <View className="p-1">
        {selectedImage && (
          <View className="relative m-1 h-20 w-20 rounded-lg bg-gray-100 shadow-sm">
            <Image source={{ uri: selectedImage }} className="h-full w-full" resizeMode="cover" />
            <TouchableOpacity
              onPress={removeImage}
              className="absolute -right-1 -top-1 h-6 w-6 items-center justify-center rounded-full bg-red-500 shadow-sm">
              <Ionicons name="close" size={14} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View className="m-1 flex-col rounded-xl border border-gray-400 px-1 py-1">
          <View className="flex flex-col justify-end" style={{ minHeight: 45 }}>
            <Controller
              control={control}
              name="message"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Escribe tu mensaje..."
                  value={value}
                  onChangeText={onChange}
                  onContentSizeChange={(e) => {
                    const newHeight = Math.max(35, e.nativeEvent.contentSize.height);
                    setHeight(newHeight);
                  }}
                  style={{ height: Math.min(height, 80), maxHeight: 80 }}
                  className="bg-[#d9eff4]] w-full rounded-lg px-3 py-1 text-base"
                  onBlur={onBlur}
                  multiline
                  textAlignVertical="top"
                  editable={!disabled}
                />
              )}
            />
          </View>

          <View className="flex-row items-center justify-between py-1">
            <TouchableOpacity
              onPress={() => setShowImageModal(true)}
              disabled={disabled}
              className="ml-1 p-1">
              <PlusIcon size={20} color={disabled ? '#9CA3AF' : '#6B7280'} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || disabled}
              className={`items-center justify-center rounded-full p-2 ${isValid && !disabled ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <ArrowUpIcon
                size={18}
                color={isValid && !disabled ? 'white' : '#9CA3AF'}
                style={{ transform: [{ rotate: '45deg' }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};
