import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import NavigationService from './NavigationService';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

// Components
import {
  sharewhite,
  favwhite,
  back,
  direction,
  call,
  star,
} from '../constants/icons';
import HeaderWithFunction from '../components/HeaderWithFunction';
import {SIZES} from '../constants/theme';
import ResturentDetailImage from '../components/ResturentDetailImage';
import TitleText from '../components/TitleText';
import {MENU_PHOTO} from '../../assets/Data/Recipies';

const ResturentScreen = props => {
  const {recipiesname, recipiesimage, distance, categories, address} = {
    ...props.route.params.item.item,
  };

  const ShopOpenClose = () => {
    const currentTime = new Date().getHours();
    console.log(currentTime);

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

  const lengthOfMenuItem = MENU_PHOTO.length;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* Resturent Image set using Components */}
          <ResturentDetailImage
            image={recipiesimage}
            name={recipiesname}
            onBack={() => {
              NavigationService.goBack();
            }}
          />

          {/* Restaurants Data set using Components */}

          <View style={styles.HeadingTextView}>
            <Text style={styles.recipiesName}>Pau-Bhaji</Text>

            {/* Side Button set  */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => console.log('Italiyan categories')}>
                <LinearGradient
                  colors={['#FF705E', '#FF705E', '#F58447']}
                  style={styles.sideBarButton}>
                  <Text style={styles.buttonText}>Italian</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Kilometer click')}>
                <View
                  style={[styles.sideBarButton, {backgroundColor: '#848DFF'}]}>
                  <Text style={styles.buttonText}>1.2 km</Text>
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
                  <Image
                    source={star}
                    resizeMode="contain"
                    style={styles.star}
                  />
                  <Text style={styles.rettingText}>4.5</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.addressView}>
            <Text style={styles.addressText}>
              394 Broome St, New York, NY 10013, USA
            </Text>
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

          <View style={{marginTop: SIZES.base * 2}}>
            <TitleText
              title="Menu - Photos"
              seeall={`See all (${lengthOfMenuItem})`}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
  imageStyles: {
    height: SIZES.base * 10,
    width: SIZES.base * 10,
  },
});

export default ResturentScreen;
