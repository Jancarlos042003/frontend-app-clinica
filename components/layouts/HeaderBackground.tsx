import { ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';

import Logo from '../icons/Logo';

type HeaderBackgroundProps = {
  image?: ImageSourcePropType;
  children?: ReactNode;
};

const imageDefault = require('../../assets/images/login-med.png'); // Default image if none is provided

const HeaderBackground = ({
  image = imageDefault,
  children = <Logo />, // Default children if none are provided
}: HeaderBackgroundProps) => {
  return (
    <View className="absolute left-0 right-0 top-0 h-[390px] w-full">
      <ImageBackground source={image} className="flex-1" resizeMode="cover">
        <View className="absolute inset-0 bg-black/45" />
        <View className="flex-1 items-center justify-center">{children}</View>
      </ImageBackground>
    </View>
  );
};

export default HeaderBackground;
