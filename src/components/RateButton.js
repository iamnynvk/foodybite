import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SIZES} from '../constants/theme';

const RateButton = ({title, onPress, style}) => {
  return (
    <View style={[styles.mainContainer, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.textStyles}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#5663FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  container: {
    marginBottom: SIZES.base * 7.5,
    height: SIZES.height / 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#5663FF',
    paddingBottom: SIZES.base * 1.5,
    paddingTop: SIZES.base * 1.5,
  },
  textStyles: {
    height: SIZES.height / 15,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: 'JosefinSans-Regular',
    color: 'white',
    fontSize: SIZES.font * 1.2,
  },
});
export default RateButton;
