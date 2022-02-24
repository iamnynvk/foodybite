import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {SIZES} from '../constants/theme';
import {star} from '../constants/icons';

const ReviewPannel = ({data}) => {
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity>
          <View style={[styles.rettingContainerView, {flex: 1}]}>
            <Image
              source={{uri: data.image}}
              style={styles.rettingImageStyles}
            />

            <View style={{flex: 1}}>
              <View
                style={[
                  styles.rettingNameStyles,
                  {
                    justifyContent: 'space-between',
                    alignContent: 'space-between',
                  },
                ]}>
                <View>
                  <Text
                    style={{
                      color: '#3E3F68',
                      fontFamily: 'JosefinSans-SemiBold',
                      fontSize: SIZES.base * 2.2,
                    }}>
                    {data.name}
                  </Text>
                </View>
                <View
                  style={{
                    marginEnd: SIZES.base * 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    padding: SIZES.base * 0.8,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={star}
                    resizeMode="contain"
                    style={{height: SIZES.base * 2.2, width: SIZES.base * 2.2}}
                  />
                  <Text>{data.retting}</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'JosefinSans-Regular',
                    color: '#6E7FAA',
                    textAlign: 'left',
                    marginRight: SIZES.base * 3,
                  }}>
                  {data.review}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  rettingContainerView: {
    marginVertical: SIZES.base * 1,
    flexDirection: 'row',
    marginTop: SIZES.base * 2,
  },
  rettingImageStyles: {
    height: SIZES.base * 10,
    width: SIZES.base * 10,
    marginHorizontal: SIZES.base * 2,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  rettingNameStyles: {
    flexDirection: 'row',
  },
});

export default ReviewPannel;
