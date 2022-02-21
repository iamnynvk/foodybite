import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {star} from '../constants/icons';
import {resturentOne} from '../constants/images';
import {SIZES} from '../constants/theme';

const Resturents = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity>
        <View style={styles.container}>
          <ImageBackground
            source={resturentOne}
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
            <Text style={styles.recipiesName}>Happy Bones</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    margin: SIZES.base * 3,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    height: SIZES.height * 0.3,
    width: SIZES.width * 1,
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
  },
  recipiesName: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: SIZES.font * 1.5,
    color: '#4CD964',
  },
});

export default Resturents;
