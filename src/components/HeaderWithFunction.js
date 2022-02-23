import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {SIZES} from '../constants/theme';

const HeaderWithFunction = ({
  title,
  backIconType,
  back,
  shareIconType,
  share,
  favIconType,
  fav,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {/* Back button */}
        <TouchableOpacity onPress={back}>
          <View style={styles.imageView}>
            <Image source={backIconType} style={styles.imageStyle} />
          </View>

          {/* Header title */}
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={[styles.textStyle, {color: '#222455'}]}>{title}</Text>
        </View>

        {/* Share button */}
        <TouchableOpacity onPress={share}>
          <View style={styles.imageViews}>
            <Image source={shareIconType} style={styles.imageStyles} />
          </View>
        </TouchableOpacity>

        {/* Fav button */}
        <TouchableOpacity onPress={fav}>
          <View style={styles.imageViews}>
            <Image source={favIconType} style={styles.imageStyles} />
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

export default HeaderWithFunction;
