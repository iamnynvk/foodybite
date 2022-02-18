import React, {createContext, useState} from 'react';
import {ToastAndroid} from 'react-native';

// Import Methods from Firebase
import {
  getAuthUserId,
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

        // User Authentication & Registration both in One Method

        authAndRegisterUser: async (imageUri, names, emails, passwords) => {
          try {
            await authRegisterHandler(imageUri, names, emails, passwords);
            ToastAndroid.show(
              `Registration Successful, Please Check Your Email To Verify Your Account`,
              ToastAndroid.SHORT,
            );
            ToastAndroid.show(
              `Verification Email Sent to ${emails}`,
              ToastAndroid.LONG,
            );
          } catch (error) {
            console.log('Authenticate Error from context : ', error);
          }
        },

        // User Login Method

        loginUser: async (emails, passwords) => {
          try {
            await loginHandler(emails, passwords);
            ToastAndroid.show(
              `Verification Email Sent to ${emails}`,
              ToastAndroid.LONG,
            );
          } catch (error) {
            console.log('Login Error from context : ', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
