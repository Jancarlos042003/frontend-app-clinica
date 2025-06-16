import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

import RegisterSection from "../../components/auth/RegisterSection";
import VerificationModal from "../../components/auth/VerificationModal";
import BackButton from "../../components/buttons/BackButton";
import SubmitButton from "../../components/buttons/SubmitButton";
import { UserLarge } from "../../components/icons/icons";
import KeyboardAwareFormLayout from "../../components/layouts/KeyboardAwareFormLayout";
import { ScreenWrapper } from "../../components/layouts/ScreenWrapper";
import useApi from "../../hooks/useApi";
import { DniSchema, dniSchema } from "../../schemas/DniSchema";

const VerifyDni = () => {
  const router = useRouter();
  const { error, loading, fetchData, clearError } = useApi<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<DniSchema>({
    defaultValues: {
      dni: ""
    },
    resolver: zodResolver(dniSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetchData(`/api/auth/check-user?identifier=${data.dni}`, "GET");

      if (response) {
        setModalVisible(true); // Mostrar el modal de verificación
      }
    } catch (error) {
      console.error("Error al llamar a la API:", error);
    }
  };

  return (
    <KeyboardAwareFormLayout>
      <ScreenWrapper edges={["top", "bottom"]}>
        <View style={{ padding: 24, flex: 1 }}>
          <BackButton onPress={router.back} />

          <View style={styles.centered}>
            <View style={styles.iconContainer}>
              <UserLarge size={90} color="#32729F" />
            </View>

            <Text style={styles.title}>Verificación de DNI</Text>

            <Text style={styles.subtitle}>Ingresa tu DNI para verificar tu identidad</Text>

            <View style={styles.inputContainer}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Ingresa tu DNI"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text.replace(/[^0-9]/g, ""));
                      clearError(); // Limpiar el error al cambiar el texto
                    }}
                    value={value}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={8}
                  />
                )}
                name="dni"
              />

              {errors.dni && <Text style={styles.errorText}>{errors.dni.message?.toString()}</Text>}

              {error && <Text style={styles.errorText}>{error}</Text>}

              <View style={styles.submitButtonContainer}>
                <SubmitButton
                  onPress={handleSubmit(onSubmit)}
                  loading={loading}
                  text="Verificar DNI"
                />
              </View>

              <VerificationModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                dni={Number(watch("dni"))}
              />

              <RegisterSection
                questionText="¿Ya tienes cuenta?"
                actionText="Iniciar sesión"
                onPress={() => router.push("login")}
              />
            </View>
          </View>
        </View>
      </ScreenWrapper>
    </KeyboardAwareFormLayout>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainer: {
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#32729F"
  },
  subtitle: {
    marginBottom: 32,
    textAlign: "center",
    fontSize: 16,
    color: "#101010"
  },
  inputContainer: {
    width: 320
  },
  input: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D4D4D8",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    textAlign: "center",
    fontSize: 18,
    color: "#101010",
    marginBottom: 4
  },
  errorText: {
    marginTop: 4,
    textAlign: "center",
    fontSize: 14,
    color: "#ef4444"
  },
  submitButtonContainer: {
    marginTop: 24
  }
});

export default VerifyDni;
