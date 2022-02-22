import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

// Cmponents
import Resturents from '../components/Resturents';
import SearchBar from '../components/SearchBar';
import TitleText from '../components/TitleText';

// Data-Dummy
import {CATEGORIES, FRIENDS, RECIPIES} from '../../assets/Data/Recipies';
import Categories from '../components/Categories';
import Friends from '../components/Friends';
import {SIZES} from '../constants/theme';

const Homescreen = () => {
  const {authUser} = useContext(AuthContext);

  console.log('WIndoewd Height :', SIZES.height);
  console.log('this is homescreen data get : ', authUser);

  let lengthOfRecipies = RECIPIES.length;
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
          />

          {/* Trending Resturents List */}
          {/* {RECIPIES.map((item, index) => {
            return (
              <Resturents
                key={index}
                itemName={item.recipiesname}
                itemImage={item.recipiesimage}
                itemCategories={item.categories}
                itemDistance={item.distance}
                itemAddress={item.address}
              />
            );
          })} */}
          <Resturents />

          {/* Categories Resturents*/}
          <TitleText
            title="Category"
            seeall={`See all(${lengthOfCategories})`}
            style={{marginTop: SIZES.base * 2}}
          />

          {/* Categories Resturents List */}
          <Categories />

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
