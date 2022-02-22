import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {star} from '../constants/icons';
import {SIZES} from '../constants/theme';

// Data
import {RECIPIES} from '../../assets/Data/Recipies';
const Resturents = () => {
  const recipiesRender = recipiesData => {
    return (
      <View>
        <TouchableNativeFeedback>
          <View style={styles.container} key={recipiesData.index}>
            <ImageBackground
              source={{uri: recipiesData.item.recipiesimage}}
              resizeMode="cover"
              style={styles.image}>
              <View style={styles.innerImageView}>
                <TouchableOpacity>
                  <View style={styles.innerButtonView}>
                    <Text style={styles.innerText}>Open</Text>
                  </View>
                </TouchableOpacity>

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
                    <Text>4.5</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View style={styles.HeadingTextView}>
              <Text style={styles.recipiesName}>
                {recipiesData.item.recipiesname}
              </Text>

              {/* Side Button set  */}
              <TouchableOpacity
                onPress={() => console.log('Italiyan categories')}>
                <LinearGradient
                  colors={['#FF705E', '#FF705E', '#F58447']}
                  style={styles.sideBarButton}>
                  <Text style={styles.buttonText}>
                    {recipiesData.item.categories}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Kilometer click')}>
                <View
                  style={[styles.sideBarButton, {backgroundColor: '#848DFF'}]}>
                  <Text style={styles.buttonText}>
                    {recipiesData.item.distance}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.addressView}>
              <Text style={styles.addressText}>
                {recipiesData.item.address}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={RECIPIES}
      renderItem={recipiesRender}
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 1.1,
    margin: SIZES.base * 2,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: SIZES.height * 0.3,
    width: '100%',
  },
  innerImageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.base * 2,
    marginTop: SIZES.base * 2,
  },
  innerButtonView: {
    backgroundColor: '#FFFFFF',
    padding: SIZES.base * 0.8,
    borderRadius: 10,
  },
  innerText: {
    color: '#4CD964',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  star: {
    height: SIZES.base * 2.2,
    width: SIZES.base * 2.2,
  },
  HeadingTextView: {
    flexDirection: 'row',
    marginHorizontal: SIZES.base * 2,
    marginTop: SIZES.base * 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  recipiesName: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: SIZES.font * 1.5,
    color: '#3E3F68',
  },
  sideBarButton: {
    borderRadius: 25,
    marginLeft: SIZES.base * 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    padding: SIZES.base * 0.8,
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

export default Resturents;
