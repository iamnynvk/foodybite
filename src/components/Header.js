import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SIZES} from '../constants/theme';

const Header = ({title, iconType, back}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={back}>
          <View style={styles.imageView}>
            <Image source={iconType} style={styles.imageStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.titleView}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
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
});

export default Header;
