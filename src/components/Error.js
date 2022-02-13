import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SIZES} from '../constants/theme';

const Error = ({error}) => {
  return (
    <View style={styles.errorView}>
      <Text style={styles.errors}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorView: {
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.01,
  },
  errors: {color: 'white', fontFamily: 'JosefinSans-Regular'},
});

export default Error;
