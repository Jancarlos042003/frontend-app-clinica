import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RegisterSection from '../../components/auth/RegisterSection';
import BackButton from '../../components/buttons/BackButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import TogglePasswordButton from '../../components/buttons/TogglePasswordButton';
import HeaderBackground from '../../components/layouts/HeaderBackground';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { ScreenWrapper } from '../../components/layouts/ScreenWrapper';
import useApi from '../../hooks/useApi';
import { LoginSchema, loginSchema } from '../../schemas/LoginSchema';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();
  const insets = useSafeAreaInsets();

  // Ajuste del padding superior para el botón de retroceso
  const paddingTopBackButton = insets.top > 0 ? insets.top + 24 : 24;

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
      password: data.password.trim(),
    };

    try {
      const response = await fetchData(`/api/auth/login`, 'POST', requestData);

      if (response) {
        router.push('home');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <KeyboardAwareFormLayout>
      <ScreenWrapper edges={['bottom']}>
        <HeaderBackground />
        <View className="ml-6" style={{ marginTop: paddingTopBackButton }}>
          <BackButton onPress={router.back} color="white" />
        </View>

        <View className="mt-[255px] flex-1 rounded-t-2xl bg-primary_100 px-7 py-9">
          <Text className="text-4xl font-bold text-primary">Iniciar Sesión</Text>

          <Text className="mb-4 text-base text-black">Ingresa tus credenciales</Text>

          <View className="w-full">
            <Controller
              control={control}
              name="dni"
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="mb-4">
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
                    <Text className=" text-sm text-red-500">{errors.dni.message}</Text>
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
                    <Text className="text-sm text-red-500">{errors.password.message}</Text>
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
      </ScreenWrapper>
    </KeyboardAwareFormLayout>
  );
};

export default Login;
