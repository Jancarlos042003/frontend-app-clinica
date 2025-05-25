import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';
import BackButton from '../../components/buttons/BackButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import { LockClosed } from '../../components/icons/icons';
import { API_URL } from '../../config/env';
import useApi from '../../hooks/useApi';
import { PasswordSchema, passwordSchema } from '../../schemas/PasswordSchema';

const Signup = () => {
  const router = useRouter();
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const { error, loading, fetchData, clearError } = useApi<any>();

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
    const requestData = {
      identifier: dni,
      password: data.password,
      confirm_password: data.confirmPassword,
    };

    try {
      const response = await fetchData(`${API_URL}/api/credentials`, '', 'POST', requestData);
      console.log(response);

      if (response) {
        Alert.alert('Cuenta creada', 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.', [
          {
            text: 'Iniciar sesión',
            onPress: () => router.push('login'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No pudimos crear tu contraseña. Por favor, inténtalo de nuevo.');
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
                  <LockClosed size={100} color="#32729F" />
                </View>

                <Text className="mb-2 text-center text-3xl font-bold text-primary">
                  Crea tu contraseña
                </Text>

                <Text className="mb-8 text-center text-base text-[#101010]">
                  Crea una contraseña segura para proteger tu cuenta
                </Text>

                <View className="w-96">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <View className="mb-4">
                        <PasswordInput
                          value={value}
                          onChangeText={(text) => {
                            onChange(text);
                            clearError();
                          }}
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
                        onChangeText={(text) => {
                          onChange(text);
                          clearError();
                        }}
                        placeholder="Confirmar contraseña"
                        error={errors.confirmPassword?.message}
                      />
                    )}
                  />

                  <SubmitButton
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                    text="Crear cuenta"
                    className="mt-4"
                  />

                  {error && <Text className="mt-1 text-center text-sm text-red-500">{error}</Text>}
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signup;
