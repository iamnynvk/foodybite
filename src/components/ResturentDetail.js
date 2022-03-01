import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {star} from '../constants/icons';
import {SIZES} from '../constants/theme';

const ResturentDetail = ({name, categories, distance, address, ratting}) => {
  const ShopOpenClose = () => {
    const currentTime = new Date().getHours();

    if (currentTime >= 10 && currentTime <= 22) {
      return (
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>Open Now </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionText}>Closed Now </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <View style={styles.HeadingTextView}>
        <Text style={styles.recipiesName}>{name}</Text>

        {/* Side Button set  */}
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => console.log('Italiyan categories')}>
            <LinearGradient
              colors={['#FF705E', '#FF705E', '#F58447']}
              style={styles.sideBarButton}>
              <Text style={styles.buttonText}>{categories}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Kilometer click')}>
            <View style={[styles.sideBarButton, {backgroundColor: '#848DFF'}]}>
              <Text style={styles.buttonText}>{distance}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity>
            <View
              style={[
                styles.innerButtonView,
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <Image source={star} resizeMode="contain" style={styles.star} />
              <Text style={styles.rettingText}>{ratting}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addressView}>
        <Text style={styles.addressText}>{address}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        {ShopOpenClose()}

        <View>
          <Text style={styles.descriptionTexts}>Daily Time </Text>
        </View>

        <View>
          <Text style={styles.descriptionText}>9:30 Am to 11:30 Am</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeadingTextView: {
    flexDirection: 'row',
    marginHorizontal: SIZES.base * 2,
    marginTop: SIZES.base * 2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipiesName: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: SIZES.font * 1.5,
    color: '#3E3F68',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    padding: SIZES.base * 0.8,
    fontFamily: 'JosefinSans-Regular',
  },
  descriptionView: {
    marginStart: SIZES.base * 2,
  },
  descriptionText: {
    color: 'red',
    fontFamily: 'JosefinSans-Regular',
  },
  descriptionTexts: {
    fontFamily: 'JosefinSans-Regular',
  },
  sideBarButton: {
    borderRadius: 25,
    marginLeft: SIZES.base * 1,
  },
  innerButtonView: {
    backgroundColor: '#FFFFFF',
    padding: SIZES.base * 0.8,
    borderRadius: 10,
  },
  star: {
    height: SIZES.base * 2.2,
    width: SIZES.base * 2.2,
  },
  rettingText: {
    fontFamily: 'JosefinSans-Regular',
  },
  addressView: {
    marginHorizontal: SIZES.base * 2,
    marginVertical: SIZES.base * 1,
  },
  addressText: {
    fontFamily: 'JosefinSans-Regular',
  },
});

export default ResturentDetail;
