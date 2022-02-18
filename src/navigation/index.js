import React from 'react';
import {AuthProvider} from './AuthProvider.js';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './Routes';

const index = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default index;
