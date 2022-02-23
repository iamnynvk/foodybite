import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SIZES} from '../constants/theme';

const TitleText = ({title, seeall, style, onPress}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.textHead}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textSide}>{seeall}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.base * 2.2,
    alignContent: 'center',
    alignItems: 'center',
  },
  textHead: {
    fontSize: SIZES.base * 2.5,
    fontFamily: 'JosefinSans-SemiBold',
    color: '#222455',
  },
  textSide: {
    color: '#6E7FAA',
    fontFamily: 'JosefinSans-Regular',
  },
});

export default TitleText;
