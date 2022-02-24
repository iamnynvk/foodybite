import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {SIZES} from '../constants/theme';

const HeaderWithClose = ({title, backIconType, back, closeIconType, close}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {/* Back button */}
        <TouchableOpacity onPress={back}>
          <View style={styles.imageView}>
            <Image
              source={backIconType}
              style={styles.imageStyle}
              resizeMode="contain"
            />
          </View>

          {/* Header title */}
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={[styles.textStyle, {color: '#222455'}]}>{title}</Text>
        </View>

        {/* close button */}
        <TouchableOpacity onPress={close}>
          <View style={styles.imageViews}>
            <Image source={closeIconType} style={styles.imageStyles} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageView: {
    alignItems: 'flex-start',
    marginTop: SIZES.height * 0.005,
  },
  imageStyle: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
  },
  imageViews: {
    alignItems: 'flex-end',
    marginTop: SIZES.height * 0.005,
  },
  imageStyles: {
    width: 25,
    height: 25,
    marginRight: 20,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3,
  },
});

export default HeaderWithClose;
