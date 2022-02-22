import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CATEGORIES} from '../../assets/Data/Recipies';
import {SIZES} from '../constants/theme';

const Categories = () => {
  const rennderCategories = CategoriesItem => {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity>
          <View style={styles.container}>
            <ImageBackground
              resizeMode="cover"
              style={styles.image}
              source={{
                uri: CategoriesItem.item.image,
              }}>
              <LinearGradient
                colors={[
                  `${CategoriesItem.item.color.colorOne}`,
                  `${CategoriesItem.item.color.colorTwo}`,
                  `${CategoriesItem.item.color.colorThree}`,
                ]}
                style={styles.gradient}>
                <Text style={styles.categoriesText}>
                  {CategoriesItem.item.categories}
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <FlatList
      data={CATEGORIES}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={rennderCategories}
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: SIZES.base * 15,
    marginHorizontal: SIZES.base * 1,
    marginVertical: SIZES.base * 2,
    height: SIZES.height * 0.2,
  },
  container: {
    flexDirection: 'row',
    width: SIZES.base * 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    height: SIZES.base * 20,
    width: SIZES.base * 15,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  categoriesText: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    fontSize: SIZES.base * 2,
  },
});

export default Categories;
