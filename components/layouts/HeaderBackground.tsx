import { ReactNode } from 'react';
import { ImageBackground, ImageSourcePropType, StyleSheet, View } from 'react-native';

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
    <View style={styles.headerContainer}>
      <ImageBackground source={image} style={styles.imageBackground} resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.centerContent}>{children}</View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 390,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderBackground;
