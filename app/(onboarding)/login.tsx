import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { saveTokens } from "../../auth/tokenService";
import RegisterSection from "../../components/auth/RegisterSection";
import BackButton from "../../components/buttons/BackButton";
import SubmitButton from "../../components/buttons/SubmitButton";
import TogglePasswordButton from "../../components/buttons/TogglePasswordButton";
import HeaderBackground from "../../components/layouts/HeaderBackground";
import KeyboardAwareFormLayout from "../../components/layouts/KeyboardAwareFormLayout";
import { ScreenWrapper } from "../../components/layouts/ScreenWrapper";
import useApi from "../../hooks/useApi";
import { useUser } from "../../hooks/useUser";
import { LoginSchema, loginSchema } from "../../schemas/LoginSchema";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();
  const insets = useSafeAreaInsets();
  const { user, loginUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: ""
    }
  });

  // Redirige a home cuando el usuario esté cargado
  useEffect(() => {
    if (user) {
      router.replace("/(tabs)/home");
    }
  }, [user]);

  const onSubmit = async (data: LoginSchema) => {
    const requestData = {
      identifier: data.dni,
      password: data.password.trim()
    };

    try {
      const response = await fetchData(`/api/auth/login`, "POST", requestData);

      if (response) {
        console.log("Inicio de sesión exitoso:", response); // <- Eliminar log

        // Guardar el token de acceso en el almacenamiento local
        const { token, refreshToken } = response;
        await saveTokens(token, refreshToken);

        // Actualizar el usuario en el contexto
        loginUser(token);

        // Redirige a la pantalla de inicio
        // El useEffect se encargará de redirigir a home
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <KeyboardAwareFormLayout>
      <ScreenWrapper edges={["top", "bottom"]}>
        <HeaderBackground />
        <View
          style={{
            marginLeft: 24,
            marginTop: 24
          }}>
          <BackButton onPress={router.back} color="white" />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name="dni"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, errors.dni ? styles.inputError : styles.inputDefault]}
                    placeholder="DNI"
                    keyboardType="number-pad"
                    maxLength={8}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                  {errors.dni && <Text style={styles.errorText}>{errors.dni.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <View style={styles.passwordWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        errors.password ? styles.inputError : styles.inputDefault
                      ]}
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
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                  <Pressable style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                  </Pressable>
                </View>
              )}
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} loading={loading} />

            {error && <Text style={styles.errorMessage}>{error}</Text>}

            <RegisterSection onPress={() => router.push("verify-dni")} />
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAwareFormLayout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 255,
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#F3F7FA",
    paddingHorizontal: 28,
    paddingVertical: 36
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#32729F"
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 16,
    color: "#101010"
  },
  inputWrapper: {
    width: "100%"
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
    fontSize: 18,
    color: "#101010",
    marginBottom: 8,
    borderWidth: 1,
    textAlign: "left"
  },
  inputDefault: {
    borderColor: "#D4D4D8"
  },
  inputError: {
    borderColor: "#ef4444"
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444"
  },
  passwordWrapper: {
    position: "relative"
  },
  forgotPassword: {
    marginBottom: 16,
    alignSelf: "flex-end"
  },
  forgotPasswordText: {
    fontWeight: "600",
    color: "#32729F"
  },
  errorMessage: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    color: "#ef4444"
  }
});

export default Login;
