import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';

// Import Methods from Firebase
import {
  authRegisterHandler,
  registrationHandler,
  loginHandler,
} from '../utils/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [authUser, setAuthUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        authRegisterUser: async (email, password) => {
          try {
            const result = authRegisterHandler(email, password);
            ToastAndroid.show(
              `Verification Email Sent to ${email}`,
              ToastAndroid.LONG,
            );
            console.log('Authenticate User : -----> ', result);
          } catch (error) {
            console.log('Authenticate Error from context : ', error);
          }
        },

        registrationUser: async (imageUrl, name, email) => {
          try {
            const result = registrationHandler(imageUrl, name, email);
          } catch (error) {
            console.log('Registration Error from context : ', error);
          }
        },

        loginUser: async (email, password) => {
          try {
            const result = loginHandler(email, password);
            ToastAndroid.show(
              `Verification Email Sent to ${email}`,
              ToastAndroid.LONG,
            );
            console.log('Login User : -----> ', result);
          } catch (error) {
            console.log('Login Error from context : ', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
