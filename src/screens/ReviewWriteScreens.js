import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {backColor, close} from '../constants/icons';
import NavigationService from './NavigationService';
import HeaderWithClose from '../components/HeaderWithClose';
import {Rating} from 'react-native-ratings';
import {SIZES} from '../constants/theme';
import {TextInput} from 'react-native-gesture-handler';
import RateButton from '../components/RateButton';

const ReviewWriteScreens = ({
  recipiesname,
  recipiesimage,
  distance,
  categories,
  address,
  allOverRatting,
}) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');

  // Submit Review
  const submitReview = () => {
    console.log('Rate :', rating);
    console.log('review  :', review);
  };

  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRating(rating);
  };
  return (
    <View style={styles.container}>
      <View>
        <HeaderWithClose
          title={`Review & Ratings`}
          backIconType={backColor}
          back={() => NavigationService.goBack()}
          closeIconType={close}
          close={() => NavigationService.replace('Homescreen')}
        />
      </View>

      <View style={styles.rettingView}>
        <Rating
          type="star"
          ratingCount={5}
          imageSize={40}
          showRating
          onFinishRating={ratingCompleted}
        />

        <View style={styles.textView}>
          <Text style={styles.textStyle}>Rate your experiences</Text>
        </View>

        <View style={styles.textInputView}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Write your experiences"
            keyboardType="default"
            value={review}
            onChangeText={text => {
              setReview(text);
            }}
            style={{
              height: 200,
              textAlignVertical: 'top',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: '#8A98BA',
              fontFamily: 'JosefinSans-Regular',
              fontSize: 15,
              padding: 15,
            }}
          />
        </View>
        <RateButton
          title={`Done`}
          style={{marginTop: SIZES.height / 4}}
          onPress={() => submitReview()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rettingView: {
    marginTop: SIZES.base * 4,
  },
  textView: {
    marginTop: SIZES.base * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: SIZES.base * 2,
  },
  textInputView: {
    marginTop: SIZES.base * 8,
    marginHorizontal: SIZES.base * 2,
  },
});

export default ReviewWriteScreens;
