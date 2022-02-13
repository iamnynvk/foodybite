import React from 'react';
import {View, Text, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {backgroundTwo} from '../constants/images';
import {SIZES} from '../constants/theme';
import Header from '../components/Header';
import {back} from '../constants/icons';

const RegistrationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A16" />
      <ImageBackground source={backgroundTwo} style={styles.imageStyle}>
        <BlurView
          blurType="dark"
          style={styles.blurStyle}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="dark"
        />
        <Header
          title="Registration"
          iconType={back}
          back={() => {
            navigation.goBack();
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default RegistrationScreen;
