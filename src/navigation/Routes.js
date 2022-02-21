import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationService from '../screens/NavigationService';
import {AuthContext} from '../navigation/AuthProvider';
import auth from '@react-native-firebase/auth';

// Routers
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import {StatusBar} from 'react-native';

const Routes = () => {
  // Check user are already login or not -------- here to ---
  const {authUser, setAuthUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setAuthUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }

  console.log('User is already Available : ', authUser);

  /** --------- Here -------- */

  return (
    // Navigation Action Apply for Contect Provider

    <NavigationContainer
      ref={NavigationService.navigationRef}
      onReady={() => {
        NavigationService.isReadyRef.current = true;
        NavigationService.routeNameRef.current =
          NavigationService.navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={() => {
        const currentRouteName =
          NavigationService.navigationRef.current.getCurrentRoute().name;
        NavigationService.routeNameRef.current = currentRouteName;
      }}>
      <StatusBar backgroundColor="#6B75E6" barStyle="light-content" />

      {authUser ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
