import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import {SIZES} from '../constants/theme';
import {FRIENDS} from '../../assets/Data/Recipies';

const Friends = () => {
  const renderFriends = friendsData => {
    return (
      <View style={styles.container}>
        <View>
          <Image
            resizeMode="contain"
            style={styles.imageStyles}
            source={{
              uri: friendsData.item.image,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={FRIENDS}
      renderItem={renderFriends}
      keyExtractor={(item, index) => index}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.base * 1,
    marginVertical: SIZES.base * 2,
    flexDirection: 'row',
    width: SIZES.width / 6.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyles: {
    height: SIZES.base * 8,
    width: SIZES.base * 8,
  },
});

export default Friends;
