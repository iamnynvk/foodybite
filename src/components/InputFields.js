import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {SIZES} from '../constants/theme';

const InputFields = ({
  labelValue,
  onChangeText,
  onBlur,
  placeholderText,
  iconType,
  style,
  iconStyle,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <View style={styles.imageView}>
        <Image source={iconType} style={[styles.inputImage, iconStyle]} />
      </View>
      <TextInput
        value={labelValue}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholderText}
        placeholderTextColor="white"
        style={styles.inputTextField}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '90%',
    height: SIZES.width / 7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
  },
  imageView: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'white',
    borderColor: 'white',
  },
  inputImage: {
    height: 20,
    width: 23.7,
  },
  inputTextField: {
    width: '86%',
    color: 'white',
    marginLeft: 7,
    fontFamily: 'JosefinSans-Medium',
    fontSize: 17,
  },
});
export default InputFields;
