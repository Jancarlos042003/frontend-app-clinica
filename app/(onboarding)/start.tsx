import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StatusBar, View } from 'react-native';

import RegisterSection from '../../components/auth/RegisterSection';
import SubmitButton from '../../components/buttons/SubmitButton';
import Logo from '../../components/icons/Logo';

const img_presentation = require('../../assets/images/start-presentacion.jpg');

const Start = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <ImageBackground source={img_presentation} className="flex-1" resizeMode="cover">
        <LinearGradient colors={['rgba(41,75,110,0.3)', 'rgba(27,62,89,0.3)']} className="flex-1">
          <View className="flex-1 justify-between px-8 py-20">
            <Logo />

            <View>
              <SubmitButton onPress={() => router.push('login')} />

              <RegisterSection
                onPress={() => router.push('verify-dni')}
                questionTextClassName="text-white text-base"
                actionTextClassName="text-white text-base font-bold"
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Start;
