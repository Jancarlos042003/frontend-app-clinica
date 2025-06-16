import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";

import RegisterSection from "../../components/auth/RegisterSection";
import SubmitButton from "../../components/buttons/SubmitButton";
import Logo from "../../components/icons/Logo";
import { ScreenWrapper } from "../../components/layouts/ScreenWrapper";

const img_presentation = require("../../assets/images/start-presentacion.jpg");

const Start = () => {
  const router = useRouter();

  return (
    <ScreenWrapper edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ImageBackground source={img_presentation} style={styles.flex1} resizeMode="cover">
        <LinearGradient colors={["rgba(41,75,110,0.3)", "rgba(27,62,89,0.3)"]} style={styles.flex1}>
          <View style={styles.innerContainer}>
            <Logo />
            <View>
              <SubmitButton onPress={() => router.push("login")} />
              <RegisterSection
                onPress={() => router.push("verify-dni")}
                questionTextStyle={{ color: "#FFFFFF", fontSize: 16 }}
                actionTextStyle={{ color: "#FFFFFF", fontSize: 16, fontWeight: "bold" }}
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 80
  }
});

export default Start;
