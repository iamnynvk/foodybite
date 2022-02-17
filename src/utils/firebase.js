// Firebase Universal File for Project
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ToastAndroid} from 'react-native';

const firebaseAuth = auth();

/**
 * get current user id - you can use auth().currentUser;
 */

export const userId = firebase.auth().currentUser;

/**
 *
 * @param {*} email for Authentication user
 * @param {*} password for Authentication user
 * @returns
 */
export const authRegisterHandler = async (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(confirmResult => {
        confirmResult.user.sendEmailVerification();
        resolve(confirmResult);
      })
      .catch(error => {
        console.log('Firebase Auth User Error from Firebase File : ', error);
        reject(error);
      });
  });
};

/**
 *
 * @param {*} imageUrl provide image url to upload image to firebase storage
 * @param {*} name name is store to firebase cloud storage
 * @param {*} email email is store to firebase cloud storage
 */
export const registrationHandler = async (imageUrl, name, email) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        username: name,
        useremail: email,
        userprofile: imageUrl,
      })
      .then(confirmResult => {
        const uploadUri = imageUrl;
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

        try {
          storage().ref(filename).putFile(uploadUri);
          ToastAndroid.show('Image Uploaded Successfully', ToastAndroid.LONG);
        } catch (e) {
          console.log('Image not uploaded successfully!!', e);
        }
        console.log(
          'Conformation Result of Registration-Handler : ',
          confirmResult,
        );
        resolve(confirmResult);
      })
      .catch(error => {
        console.log('Registration Error from Firebase File : ', error);
        reject(error);
      });
  });
};

/**
 *
 * @param {*} email provide email to authenticates user with firebase
 * @param {*} password provide password to authenticates user with firebase
 */
export const loginHandler = async (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(confirmResult => {
        console.log(
          'Login of Login-Handler from Firebase File : ',
          confirmResult,
        );
        resolve(confirmResult);
      })
      .catch(error => {
        console.log('Login Error from Firebase File : ', error);
        reject(error);
      });
  });
};
