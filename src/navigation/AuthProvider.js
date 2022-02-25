import React, {createContext, useState} from 'react';
import NavigationService from '../screens/NavigationService';
import {ToastAndroid} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';

// Import Methods from Firebase
import {
  getAuthUserId,
  authRegisterHandler,
  loginHandler,
  getAuthUserData,
  signOutUser,
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
            NavigationService.replace('Homescreen');
          } catch (error) {
            console.log('Authenticate Error from context : ', error);
          }
        },

        // User Login Method

        loginUser: async (emails, passwords) => {
          try {
            await loginHandler(emails, passwords);
            const user = await getAuthUserData(getAuthUserId());
            const userID = user?._data.userid;
            console.log('User ID : ', userID);
            setAuthUser(userID);
            if (userID) {
              showMessage({
                message: 'Successfully Logged In',
                type: 'success',
              });
              NavigationService.replace('HomeScreen', {
                user,
                data: 'Name is nayan vekariya',
              });
            } else {
              showMessage({
                message: 'User Not Found',
                type: 'danger',
              });
            }
          } catch (error) {
            console.log('Login Error from context : ', error);
          }
        },

        // User Sign Out Method

        signoutUser: async () => {
          try {
            await signOutUser();
            NavigationService.replace('LoginScreen');
          } catch (error) {
            console.log('Signout Error from context : ', error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
