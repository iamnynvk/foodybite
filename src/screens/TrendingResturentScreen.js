import {View, Text, Button} from 'react-native';
import React from 'react';
import NavigationService from './NavigationService';

const TrendingResturentScreen = ({navigation}) => {
  return (
    <View>
      <Text>TrendingResturentScreen</Text>
      <Button
        title="Go to Trending List"
        onPress={() => {
          NavigationService.navigate('Homescreen');
        }}
      />
    </View>
  );
};

export default TrendingResturentScreen;
