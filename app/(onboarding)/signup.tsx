import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';

import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator';
import BackButton from '../../components/buttons/BackButton';
import SubmitButton from '../../components/buttons/SubmitButton';
import { LockClosed } from '../../components/icons/icons';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { ScreenWrapper } from '../../components/layouts/ScreenWrapper';
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
      password: data.password.trim(),
      confirm_password: data.confirmPassword.trim(),
    };

    try {
      const response = await fetchData(`/api/credentials`, 'POST', requestData);
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
      console.error('Error al crear la cuenta:', error);
    }
  };
  return (
    <KeyboardAwareFormLayout>
      <ScreenWrapper edges={['top', 'bottom']}>
        <View style={styles.container}>
          <BackButton onPress={router.back} />

          <View style={styles.centered}>
            <View style={styles.iconContainer}>
              <LockClosed size={100} color="#32729F" />
            </View>

            <Text style={styles.title}>Crea tu contraseña</Text>

            <Text style={styles.subtitle}>Crea una contraseña segura para proteger tu cuenta</Text>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputMargin}>
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

              <View style={styles.submitButtonContainer}>
                <SubmitButton
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  text="Crear cuenta"
                />
              </View>

              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAwareFormLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#32729F',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 16,
    color: '#101010',
  },
  inputContainer: {
    width: 320,
  },
  inputMargin: {
    marginBottom: 16,
  },
  submitButtonContainer: {
    marginTop: 16,
  },
  errorText: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14,
    color: '#ef4444',
  },
});

export default Signup;
