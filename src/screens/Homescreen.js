import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, FlatList} from 'react-native';
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
import NavigationService from './NavigationService';

const Homescreen = () => {
  const {authUser} = useContext(AuthContext);

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
            onPress={() => {
              NavigationService.navigate('TrendingResturentListScreen');
            }}
          />

          {/* Render Resturents Data using components */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={RECIPIES}
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
