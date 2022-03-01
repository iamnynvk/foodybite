import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {firebase} from '@react-native-firebase/firestore';

// Cmponents
import Resturents from '../components/Resturents';
import SearchBar from '../components/SearchBar';
import TitleText from '../components/TitleText';

// Data-Dummy
import {CATEGORIES, FRIENDS, RECIPIES} from '../../assets/Data/Recipies';
import Categories from '../components/Categories';
import Friends from '../components/Friends';
import {SIZES} from '../constants/theme';
import NavigationService from './NavigationService';

const Homescreen = () => {
  const {authUser} = useContext(AuthContext);
  const userId = authUser?.uid;
  const db = firebase.firestore();
  const [resturent, setResturent] = useState([]);

  useEffect(() => {
    // db.collection('posts').onSnapshot(querySnapshot => {
    //   console.log('querySnapshot', querySnapshot);
    //   querySnapshot.docs.forEach(doc => {
    //     console.log('>>>>>>>>>>', doc);
    //   });
    // });
    db.collection('posts')
      .doc(userId)
      .collection('restaurants')
      .onSnapshot(doc => {
        let resturentArray = [];
        doc.docs.map(doc => {
          resturentArray.push({
            resturentName: doc.data().resturent_name,
            resturentMobile: doc.data().resturent_mobileno,
            resturentImage: doc.data().resturent_image,
            resturentCloseTime: doc.data().resturent_closeTime,
            resturentCategories: doc.data().resturent_category,
            resturentAddress: doc.data().resturent_address,
          });
          setResturent(resturentArray);
        });
      });
  }, []);

  let lengthOfRecipies = resturent.length;
  let lengthOfCategories = CATEGORIES.length;
  let lengthOfFrineds = FRIENDS.length;

  return (
    <View style={styles.MainContainer}>
      {/* search bar set here */}
      <SearchBar />

      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          {/* Trending Resturents*/}
          <TitleText
            title="Trending Restaurants"
            seeall={`See all(${lengthOfRecipies})`}
            style={{marginTop: SIZES.base * 2}}
            onPress={() => {
              NavigationService.navigate('TrendingResturentListScreen');
            }}
          />

          {/* Render Resturents Data using components */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={resturent}
            renderItem={item => (
              <Resturents
                data={item}
                onPress={() => {
                  NavigationService.navigate('ResturentScreen', {
                    item,
                  });
                }}
              />
            )}
            keyExtractor={(item, index) => index}
          />

          {/* Categories Resturents*/}
          <TitleText
            title="Category"
            seeall={`See all(${lengthOfCategories})`}
            style={{marginTop: SIZES.base * 2}}
            onPress={() => {
              NavigationService.navigate('CategoriesItemListScreen');
            }}
          />

          {/* Categories Resturents List */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={CATEGORIES}
            renderItem={item => (
              <Categories
                data={item}
                onPress={() => {
                  NavigationService.navigate('CategoriesItemScreen');
                }}
              />
            )}
            keyExtractor={(item, index) => index}
          />

          {/* Friend Request */}
          <TitleText title="Friends" seeall={`See all(${lengthOfFrineds})`} />

          {/* Friend Request List */}
          <Friends />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    height: SIZES.height - 60,
  },
  container: {
    backgroundColor: '#F6F6F6',
  },
});

export default Homescreen;
