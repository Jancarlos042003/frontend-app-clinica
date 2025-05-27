import { ScreenWrapper } from 'components/layouts/ScreenWrapper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native';

import BackButton from '../../components/buttons/BackButton';
import { Shield } from '../../components/icons/icons';
import KeyboardAwareFormLayout from '../../components/layouts/KeyboardAwareFormLayout';
import { API_URL } from '../../config/env';
import useApi from '../../hooks/useApi';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [tooManyRequests, setTooManyRequests] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Auto-advance to next input
      if (text.length === 1 && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Detectar tecla de retroceso o eliminar
    if (e.nativeEvent.key === 'Backspace' || e.nativeEvent.key === 'Delete') {
      const newCode = [...code];
      // Si el campo actual tiene contenido, bórralo
      if (newCode[index] !== '') {
        newCode[index] = '';
        setCode(newCode);
      }
      // Si el campo actual ya está vacío y no es el primer campo, mueve al campo anterior
      else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendCode = () => {
    if (canResend && !tooManyRequests) {
      fetchData(`${API_URL}/api/auth/resend-code?identifier=${dni}`, '', 'POST')
        .then((response) => {
          console.log(response);
          Alert.alert('Código enviado', `Se ha enviado un nuevo código al número ${dni}`);
          setTimeLeft(60);
          setCanResend(false);
        })
        .catch((error) => {
          console.error('Error al reenviar el código:', error);
          // Verificar si es un error de demasiadas solicitudes
          if (
            error.message?.includes('ManyRequestsException') ||
            error.name === 'ManyRequestsException' ||
            error.status === 429
          ) {
            setTooManyRequests(true);
            Alert.alert(
              'Demasiados intentos',
              'Has excedido el límite de intentos. Por favor, intenta más tarde.'
            );
          }
        });
    }
  };

  const verifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Código incompleto', 'Por favor ingresa el código de 6 dígitos completo');
      return;
    }

    const requestData = {
      identifier: dni,
      code: fullCode,
    };

    fetchData(`${API_URL}/api/auth/verify-code`, '', 'POST', requestData)
      .then((response) => {
        console.log(response);

        // Verifica si la respuesta confirma que el código es válido
        if (response && !response.error) {
          router.push({
            pathname: 'signup', // Ruta a la que redirigir
            params: { dni },
          });
        }
      })
      .catch((error) => {
        console.error('Error al verificar el código:', error);
        // Verificar si es un error de demasiadas solicitudes
        if (
          error.message?.includes('ManyRequestsException') ||
          error.name === 'ManyRequestsException' ||
          error.status === 429
        ) {
          setTooManyRequests(true);
          Alert.alert(
            'Demasiados intentos',
            'Has excedido el límite de intentos. Por favor, intenta más tarde.'
          );
        } else {
          Alert.alert('Error', 'Código incorrecto. Por favor, inténtalo de nuevo.');
        }
      });
  };

  return (
    <KeyboardAwareFormLayout>
      <ScreenWrapper edges={['top', 'bottom']} className="p-6">
        <BackButton onPress={router.back} />

        <View className="flex-1 items-center justify-center">
          <View className="mb-8 items-center justify-center">
            <Shield size={100} color="#32729F" />
          </View>

          <Text className="mb-2 text-center text-3xl font-bold text-primary">
            Código de verificación
          </Text>

          <Text className="mb-8 text-center text-base text-[#101010]">
            Hemos enviado un código de 6 dígitos al número asociado a tu DNI
          </Text>

          <View className="w-full max-w-sm">
            <View className="mb-8 flex-row justify-between">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className="h-16 w-12 rounded-lg border border-[#D4D4D8] bg-white text-center text-2xl font-bold text-[#101010] focus:border-primary"
                  keyboardType="numeric"
                  maxLength={1}
                  value={code[index]}
                  onChangeText={(text) => {
                    // Solo permitir números
                    const numbersOnly = text.replace(/[^0-9]/g, '');
                    handleCodeChange(numbersOnly, index);
                    clearError();
                  }}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  selectTextOnFocus
                  editable={!tooManyRequests}
                />
              ))}
            </View>

            <Pressable
              className={`items-center rounded-lg py-5 active:bg-primary_500 ${loading || tooManyRequests ? 'bg-primary_300' : 'bg-primary'}`}
              onPress={verifyCode}
              disabled={loading || tooManyRequests}>
              {loading ? (
                <ActivityIndicator color="#4C4DDC" />
              ) : (
                <Text className="text-lg font-semibold text-white">Verificar código</Text>
              )}
            </Pressable>

            {error && <Text className="mt-1 text-center text-sm text-red-500">{error}</Text>}

            <View className="mt-6 items-center">
              <Text className="mb-2 text-sm text-[#101010]">
                {canResend ? '¿No recibiste el código?' : `Reenviar código en ${timeLeft}s`}
              </Text>

              <Pressable onPress={handleResendCode} disabled={!canResend || tooManyRequests}>
                <Text
                  className={`text-lg font-semibold ${canResend && !tooManyRequests ? 'text-primary' : 'text-primary_300'}`}>
                  Reenviar código
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAwareFormLayout>
  );
};

export default VerifyCode;
