import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

// Cmponents
import Resturents from '../components/Resturents';
import SearchBar from '../components/SearchBar';
import TitleText from '../components/TitleText';

const Homescreen = () => {
  const {authUser} = useContext(AuthContext);

  console.log('this is homescreen data get : ', authUser);
  return (
    <View style={styles.container}>
      {/* search bar set here */}
      <SearchBar />

      <ScrollView>
        {/* Trending Resturents*/}
        <TitleText title="Trending Restaurants" seeall="See all(45)" />

        {/* Trending Resturents List */}
        <Resturents />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
});

export default Homescreen;
