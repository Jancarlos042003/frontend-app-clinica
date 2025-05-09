import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import TogglePasswordButton from '../../components/buttons/TogglePasswordButton';
import { ArrowBack, LoginIcon } from '../../components/icons/icons';
import { LoginSchema, loginSchema } from '../../schemas/LoginSchema';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      // Simulating API call - replace with actual API endpoint
      // const response = await axios.post('https://api.example.com/login', {
      //   dni: data.dni,
      //   password: data.password
      // });

      // For demo purposes, we'll just simulate a successful response
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        // Navigate to home screen or dashboard
        // navigation.navigate('Home');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#EDEFFC]">
      <View className="flex-1 p-6">
        <Pressable className="mb-6" onPress={router.back}>
          <ArrowBack size={24} color="#101010" />
        </Pressable>

        <View className="flex-1 items-center justify-center">
          <View className="mb-8 items-center justify-center">
            <LoginIcon size={110} color="#4C4DDC" />
          </View>

          <Text className="mb-2 text-center text-2xl font-bold text-[#101010]">Iniciar sesión</Text>

          <Text className="mb-8 text-center text-base text-[#101010]">
            Ingresa tus credenciales para acceder a tu cuenta
          </Text>

          <View className="w-full max-w-sm">
            <Controller
              control={control}
              name="dni"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-1">
                  <TextInput
                    className={`border bg-white ${errors.dni ? 'border-red-500' : 'border-[#D4D4D8]'} mb-2 rounded-lg p-4 text-base text-[#101010]`}
                    placeholder="DNI"
                    keyboardType="number-pad"
                    maxLength={8}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {errors.dni && (
                    <Text className="mb-4 text-sm text-red-500">{errors.dni.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-1">
                  <View className="relative">
                    <TextInput
                      className={`border bg-white ${errors.password ? 'border-red-500' : 'border-[#D4D4D8]'} mb-2 rounded-lg p-4 pr-12 text-base text-[#101010]`}
                      placeholder="Contraseña"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    <TogglePasswordButton
                      showPassword={showPassword}
                      onToggle={() => setShowPassword(!showPassword)}
                    />
                  </View>
                  {errors.password && (
                    <Text className="mb-4 text-sm text-red-500">{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <Pressable className="mb-6 self-end">
              <Text className="font-semibold text-[#4C4DDC]">¿Olvidaste tu contraseña?</Text>
            </Pressable>

            <Pressable
              className={`items-center rounded-lg py-4 ${isLoading ? 'bg-[#C8C8F4]' : 'bg-[#4C4DDC]'}`}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#4C4DDC" />
              ) : (
                <Text className="text-base font-semibold text-white">Iniciar sesión</Text>
              )}
            </Pressable>

            <Pressable className="mt-6 py-2" onPress={() => router.push('dni-verification')}>
              <Text className="text-center text-base font-semibold text-[#4C4DDC]">
                Crear una cuenta
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
