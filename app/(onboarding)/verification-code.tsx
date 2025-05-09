import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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

import { ArrowBack, Shield } from '../../components/icons/icons';

const VerificationCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const { dni } = useLocalSearchParams<{ dni: string }>();
  const inputRefs = useRef<(TextInput | null)[]>([]);

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
    if (canResend) {
      // Simulating API call to resend code
      Alert.alert(
        'Código enviado',
        `Se ha enviado un nuevo código al número asociado al DNI ${dni}`
      );
      setTimeLeft(60);
      setCanResend(false);
    }
  };

  const verifyCode = async () => {
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      Alert.alert('Código incompleto', 'Por favor ingresa el código de 6 dígitos completo');
      return;
    }

    setIsLoading(true);
    try {
      // Simulating API call - replace with actual API endpoint
      // const response = await axios.post('https://api.example.com/verify-code', {
      //   dni,
      //   code: fullCode
      // });

      // For demo purposes, we'll just simulate a successful response
      setTimeout(() => {
        setIsLoading(false);
        router.push('create-password'); // Replace with actual screen
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Código incorrecto. Por favor, inténtalo de nuevo.');
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
              <Pressable onPress={() => router.back()}>
                <ArrowBack size={24} color="#101010" />
              </Pressable>

              <View className="flex-1 items-center justify-center">
                <View className="mb-8 items-center justify-center">
                  <Shield size={100} color="#4C4DDC" />
                </View>

                <Text className="mb-2 text-center text-2xl font-bold text-[#101010]">
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
                        className="h-16 w-12 rounded-lg border border-[#D4D4D8] bg-white text-center text-2xl font-bold text-[#101010]"
                        keyboardType="numeric"
                        maxLength={1}
                        value={code[index]}
                        onChangeText={(text) => {
                          // Solo permitir números
                          const numbersOnly = text.replace(/[^0-9]/g, '');
                          handleCodeChange(numbersOnly, index);
                        }}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        selectTextOnFocus
                      />
                    ))}
                  </View>

                  <Pressable
                    className={`items-center rounded-lg py-4 ${isLoading ? 'bg-[#C8C8F4]' : 'bg-[#4C4DDC]'}`}
                    onPress={verifyCode}
                    disabled={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color="#4C4DDC" />
                    ) : (
                      <Text className="text-base font-semibold text-white">Verificar código</Text>
                    )}
                  </Pressable>

                  <View className="mt-6 items-center">
                    <Text className="mb-2 text-sm text-[#101010]">
                      {canResend ? '¿No recibiste el código?' : `Reenviar código en ${timeLeft}s`}
                    </Text>

                    <Pressable onPress={handleResendCode} disabled={!canResend}>
                      <Text
                        className={`text-base font-semibold ${canResend ? 'text-[#4C4DDC]' : 'text-[#C8C8F4]'}`}>
                        Reenviar código
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerificationCode;
