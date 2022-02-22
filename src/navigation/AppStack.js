import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Homescreen from '../screens/Homescreen';
import TrendingResturentScreen from '../screens/TrendingResturentScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homescreen"
        component={Homescreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrendingResturent"
        component={TrendingResturentScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
