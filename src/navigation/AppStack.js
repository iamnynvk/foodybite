import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import Homescreen from '../screens/Homescreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Homescreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
