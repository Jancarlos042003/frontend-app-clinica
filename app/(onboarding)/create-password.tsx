import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';
import { ArrowBack, LockClosed } from '../../components/icons/icons';
import { PasswordSchema, passwordSchema } from '../../schemas/PasswordSchema';

const CreatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordSchema) => {
    setIsLoading(true);
    try {
      // Simulating API call - replace with actual API endpoint
      // const response = await axios.post('https://api.example.com/create-password', {
      //   dni,
      //   password: data.password
      // });

      // For demo purposes, we'll just simulate a successful response
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Cuenta creada',
          'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.',
          [
            {
              text: 'Iniciar sesión',
              onPress: () => router.push('login'),
            },
          ]
        );
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'No pudimos crear tu contraseña. Por favor, inténtalo de nuevo.');
    }
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
                  <LockClosed size={100} color="#4C4DDC" />
                </View>

                <Text className="mb-2 text-center text-2xl font-bold text-[#101010]">
                  Crea tu contraseña
                </Text>

                <Text className="mb-8 text-center text-base text-[#101010]">
                  Crea una contraseña segura para proteger tu cuenta
                </Text>

                <View className="w-full max-w-sm">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <View className="mb-4">
                        <PasswordInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="Contraseña"
                          error={errors.password?.message}
                        />
                        {value.length > 0 && <PasswordStrengthIndicator value={value} />}
                      </View>
                    )}
                  />

                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                      <PasswordInput
                        value={value}
                        onChangeText={onChange}
                        placeholder="Confirmar contraseña"
                        error={errors.confirmPassword?.message}
                      />
                    )}
                  />

                  <Pressable
                    className={`mt-4 items-center rounded-lg py-4 ${isLoading ? 'bg-[#C8C8F4]' : 'bg-[#4C4DDC]'}`}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color="#4C4DDC" />
                    ) : (
                      <Text className="text-base font-semibold text-white">Crear cuenta</Text>
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

export default CreatePassword;
