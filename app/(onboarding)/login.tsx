import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import RegisterSection from '../../components/auth/RegisterSection';
import BackButton from '../../components/buttons/BackButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import TogglePasswordButton from '../../components/buttons/TogglePasswordButton';
import HeaderBackground from '../../components/layouts/HeaderBackground';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { API_URL } from '../../config/env';
import useApi from '../../hooks/useApi';
import { LoginSchema, loginSchema } from '../../schemas/LoginSchema';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();

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
    const requestData = {
      identifier: data.dni,
      password: data.password,
    };

    try {
      const response = await fetchData(`${API_URL}/api/auth/login`, '', 'POST', requestData);
      console.log(response);

      if (response) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        router.push('home');
      }
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <KeyboardAwareFormLayout>
      <HeaderBackground />

      <View className="flex-1">
        <BackButton onPress={router.back} />

        <View className="mt-[320px] flex-1 rounded-t-3xl bg-primary_100 px-7 py-9">
          <Text className="text-4xl font-bold text-primary">Iniciar Sesión</Text>

          <Text className="mb-4 text-base text-black">Ingresa tus credenciales</Text>

          <View className="w-full">
            <Controller
              control={control}
              name="dni"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-2">
                  <TextInput
                    className={`border bg-white ${errors.dni ? 'border-red-500' : 'border-[#D4D4D8]'} mb-2 rounded-md p-4 text-lg text-[#101010] focus:border-primary`}
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
                      className={`border bg-white ${errors.password ? 'border-red-500' : 'border-[#D4D4D8]'} mb-2 rounded-md p-4 pr-12 text-lg text-[#101010] focus:border-primary`}
                      placeholder="Contraseña"
                      secureTextEntry={!showPassword}
                      value={value}
                      onChangeText={(text) => {
                        onChange(text);
                        clearError();
                      }}
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
                  <Pressable className="mb-4 self-end">
                    <Text className="font-semibold text-primary">¿Olvidaste tu contraseña?</Text>
                  </Pressable>
                </View>
              )}
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} loading={loading} />

            {error && <Text className="mt-1 text-center text-sm text-red-500">{error}</Text>}

            <RegisterSection onPress={() => router.push('verify-dni')} />
          </View>
        </View>
      </View>
    </KeyboardAwareFormLayout>
  );
};

export default Login;
