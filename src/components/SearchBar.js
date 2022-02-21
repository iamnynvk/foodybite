import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

// constants
import {setting, search} from '../constants/icons';
import {SIZES} from '../constants/theme';

const SearchBar = ({props}) => {
  const [searchText, setSearchText] = useState('');

  console.log(searchText);
  return (
    <View style={styles.container}>
      <Image source={search} resizeMode="contain" style={styles.iconStyle} />

      <TextInput
        placeholder="Find Restaurants"
        style={styles.inputTypeText}
        value={searchText}
        onChangeText={find => {
          setSearchText(find);
        }}
        placeholderTextColor="#6E7FAA"
      />

      <TouchableOpacity onPress={() => console.log('Setting Clicked')}>
        <Image source={setting} resizeMode="contain" style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginTop: SIZES.base * 2,
    marginHorizontal: SIZES.base * 2,
  },
  iconStyle: {
    width: SIZES.base * 3,
    height: SIZES.base * 3,
  },
  inputTypeText: {
    flex: 1,
    paddingLeft: SIZES.base * 2,
    paddingRight: SIZES.base * 2,
    fontSize: SIZES.base * 2,
    color: '#6E7FAA',
    fontFamily: 'JosefinSans-Regular',
  },
});

export default SearchBar;
