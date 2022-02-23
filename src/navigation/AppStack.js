import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Homescreen from '../screens/Homescreen';
import TrendingResturentListScreen from '../screens/TrendingResturentListScreen';
import ResturentScreen from '../screens/ResturentScreen';
import CategoriesItemScreen from '../screens/CategoriesItemScreen';
import CategoriesItemListScreen from '../screens/CategoriesItemListScreen';

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
        name="TrendingResturentListScreen"
        component={TrendingResturentListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ResturentScreen"
        component={ResturentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoriesItemListScreen"
        component={CategoriesItemListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CategoriesItemScreen"
        component={CategoriesItemScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
