import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RegisterSection from '../../components/auth/RegisterSection';
import BackButton from '../../components/buttons/BackButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import { UserLarge } from '../../components/icons/icons';
import { API_URL } from '../../config/env';
import useApi from '../../hooks/useApi';
import { DniSchema, dniSchema } from '../../schemas/DniSchema';

const VerifyDni = () => {
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();

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
    try {
      const response = await fetchData(
        `${API_URL}/api/auth/check-user?identifier=${data.dni}`,
        '',
        'GET'
      );

      if (response) {
        router.push({
          pathname: 'verify-code', // Ruta a la que redirigir
          // Parámetros a pasar
          params: {
            dni: data.dni,
          },
        });
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 p-6">
              <BackButton onPress={router.back} />

              <View className="flex-1 items-center justify-center">
                <View className="mb-8 items-center justify-center">
                  <UserLarge size={90} color="#32729F" />
                </View>

                <Text className="mb-2 text-center text-3xl font-bold text-primary">
                  Verificación de DNI
                </Text>

                <Text className="mb-8 text-center text-base text-[#101010]">
                  Ingresa tu DNI para verificar tu identidad
                </Text>

                <View className="w-96">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder="Ingresa tu DNI"
                        onBlur={onBlur}
                        onChangeText={(text) => {
                          onChange(text.replace(/[^0-9]/g, ''));
                          clearError(); // Limpiar el error al cambiar el texto
                        }}
                        value={value}
                        className="w-full rounded-lg border border-[#D4D4D8] bg-white px-4 py-4 text-center text-lg text-[#101010] focus:border-primary"
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

                  {error && <Text className="mt-1 text-center text-sm text-red-500">{error}</Text>}

                  <SubmitButton
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                    text="Verificar DNI"
                    className="mt-6"
                  />

                  <RegisterSection
                    questionText="¿Ya tienes cuenta?"
                    actionText="Iniciar sesión"
                    onPress={() => router.push('login')}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyDni;
