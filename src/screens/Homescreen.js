import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SearchBar from '../components/SearchBar';
import TitleText from '../components/TitleText';
import {AuthContext} from '../navigation/AuthProvider';

const Homescreen = () => {
  const {authUser} = useContext(AuthContext);

  console.log('this is homescreen data get : ', authUser);
  return (
    <View style={styles.container}>
      {/* search bar set here */}
      <SearchBar />

      {/* Trending Resturents*/}
      <TitleText title="Trending Restaurants" seeall="See all(45)" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Homescreen;
