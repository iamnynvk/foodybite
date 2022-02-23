import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {SIZES} from '../constants/theme';
import HeaderWithFunction from './HeaderWithFunction';

// constants
import {
  sharewhite,
  favwhite,
  backColor,
  direction,
  call,
  star,
} from '../constants/icons';

const ResturentDetailImage = ({image, name, onBack}) => {
  return (
    <View>
      <ImageBackground
        source={{uri: image}}
        resizeMode="cover"
        style={styles.backImage}>
        {/* Header with function */}
        <HeaderWithFunction
          title={name}
          backIconType={backColor}
          back={onBack}
          shareIconType={sharewhite}
          share={() => {
            console.log('Open Share screen');
          }}
          favIconType={favwhite}
          fav={() => {
            console.log('This is Fav screen');
          }}
        />

        {/* ImageBackground on Write data */}
        <View style={styles.contactView}>
          <BlurView
            blurAmount={10}
            blurType="light"
            style={styles.blurView}
            reducedTransparencyFallbackColor="light"
          />

          <View style={styles.blurViewContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Call Button Press');
                }}>
                <View style={styles.blurInnerView}>
                  <View>
                    <Image source={call} style={styles.imageStyle} />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text style={styles.textStyle}>+1 256-673-3754</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Direction Button Press');
                }}>
                <View style={styles.blurInnerView}>
                  <View>
                    <Image source={direction} style={styles.imageStyle} />
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}>
                    <Text style={styles.textStyle}>Direction</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backImage: {
    height: SIZES.height / 2.5,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contactView: {
    marginTop: SIZES.height * 0.2,
    marginHorizontal: SIZES.width * 0.1,
    borderRadius: 25,
    height: SIZES.height * 0.08,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  blurViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.width * 0.01,
  },
  blurInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.width * 0.01,
  },
  imageStyle: {
    height: SIZES.height * 0.05,
    width: SIZES.height * 0.05,
  },
  textStyle: {
    fontFamily: 'JosefinSans-SemiBold',
    color: '#222455',
    fontSize: SIZES.base * 1.8,
  },
});
export default ResturentDetailImage;
