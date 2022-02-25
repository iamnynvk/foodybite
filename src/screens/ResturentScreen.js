import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import NavigationService from './NavigationService';

// Components

import {SIZES} from '../constants/theme';
import ResturentDetailImage from '../components/ResturentDetailImage';
import ResturentDetail from '../components/ResturentDetail';
import TitleText from '../components/TitleText';
import {MENU_PHOTO, RETTING} from '../../assets/Data/Recipies';
import RateButton from '../components/RateButton';
import ReviewPannel from '../components/ReviewPannel';

const ResturentScreen = props => {
  const {
    recipiesname,
    recipiesimage,
    distance,
    categories,
    address,
    allOverRatting,
  } = {
    ...props.route.params.item.item,
  };

  const lengthOfMenuItem = MENU_PHOTO.length;
  const lengthOfReview = RETTING.length;

  const renderMenus = item => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <View style={styles.menuContainerView}>
            <Image
              source={{
                uri: item.item.image,
              }}
              style={{
                height: SIZES.base * 15,
                width: SIZES.base * 15,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled={true}>
        <View>
          {/* Resturent Image set using Components [back-share-fav]*/}
          <ResturentDetailImage
            image={recipiesimage}
            name={recipiesname}
            onBack={() => {
              NavigationService.replace('TrendingResturentListScreen');
            }}
            onShare={() => {}}
            onFav={() => {
              console.log('fav Button');
            }}
          />

          {/* Restaurants Data set using Components */}
          <ResturentDetail
            name={recipiesname}
            categories={categories}
            distance={distance}
            address={address}
            ratting={allOverRatting}
          />

          {/* Menu & Photo section */}
          <View style={{marginTop: SIZES.base * 2}}>
            <TitleText
              title={`Menu & Photos`}
              seeall={`See all (${lengthOfMenuItem})`}
            />

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={MENU_PHOTO}
              keyExtractor={(item, index) => index}
              renderItem={renderMenus}
            />
          </View>

          {/* Review & Retting Pannel */}
          <View style={{}}>
            <TitleText
              title={`Reviews & Rattings`}
              seeall={`See all (${lengthOfReview})`}
            />
          </View>

          {/* user Review set here  */}
          <ScrollView>
            {RETTING.map((item, index) => {
              return <ReviewPannel data={item} key={index} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <RateButton
        title={`Rate this restaurant`}
        onPress={() => {
          props.navigation.navigate('ReviewWriteScreens', {
            recipiesname,
            recipiesimage,
            distance,
            categories,
            address,
            allOverRatting,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainerView: {
    height: SIZES.base * 15,
    width: SIZES.base * 15,
    margin: SIZES.base * 2,
    borderRadius: 10,
    overflow: 'hidden',
  },

  rettingNameStyles: {
    flexDirection: 'row',
  },
});

export default ResturentScreen;
