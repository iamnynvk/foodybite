import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Homescreen from '../screens/Homescreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AddPostScreen from '../screens/AddPostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

// constants
import {
  homefill,
  homeunfill,
  favouritefill,
  favouriteunfill,
  addfill,
  addUnfill,
  notificationfill,
  notificationunfill,
  profilefill,
  profileunfill,
} from '../constants/icons';

const Tabs = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5663FF',
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 20,
          left: 10,
          right: 10,
          borderRadius: 15,
          backgroundColor: 'white',
          elevation: 0,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tabs.Screen
        name="HomeScreen"
        component={Homescreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? homefill : homeunfill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? favouritefill : favouriteunfill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? addUnfill : addfill}
                resizeMode="contain"
                style={styles.addImageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? notificationfill : notificationunfill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={focused ? profilefill : profileunfill}
                resizeMode="contain"
                style={styles.imageStyle}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  imageStyle: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  addImageStyle: {
    height: 70,
    width: 70,
    top: -30,
  },
});

export default TabNavigator;
