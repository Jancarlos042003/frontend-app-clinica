import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArrowBack, UserLarge } from '../../components/icons/icons';
import { DniSchema, dniSchema } from '../../schemas/DniSchema';

const DniVerification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DniSchema>({
    defaultValues: {
      dni: '',
    },
    resolver: zodResolver(dniSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Para simular una petición:
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: 'verification-code', // Ruta a la que redirigir
        // Parámetros a pasar
        params: {
          dni: data.dni,
        },
      });
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EDEFFC]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 p-6">
              <Pressable onPress={router.back}>
                <ArrowBack size={24} color="#101010" />
              </Pressable>

              <View className="flex-1 items-center justify-center">
                <View className="mb-8 items-center justify-center">
                  <UserLarge size={90} color="#4C4DDC" />
                </View>

                <Text className="mb-2 text-center text-2xl font-bold text-[#101010]">
                  Verificación de DNI
                </Text>

                <Text className="mb-8 text-center text-base text-[#101010]">
                  Ingresa tu DNI para verificar tu identidad
                </Text>

                <View className="w-64">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Ingresa tu DNI"
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
                        value={value}
                        className="py- w-full rounded-lg border border-[#D4D4D8] bg-white px-4 py-3 text-center text-base text-[#101010]"
                        keyboardType="numeric"
                        maxLength={8}
                      />
                    )}
                    name="dni"
                  />

                  {errors.dni && (
                    <Text className="mt-1 text-center text-sm text-red-500">
                      {errors.dni.message?.toString()}
                    </Text>
                  )}

                  <Pressable
                    className={`mt-6 items-center rounded-lg py-4 ${
                      isLoading ? 'bg-[#C8C8F4]' : 'bg-[#4C4DDC]'
                    }`}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color="#4C4DDC" />
                    ) : (
                      <Text className="text-base font-semibold text-white">Verificar DNI</Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DniVerification;
