// Firebase Universal File for Project
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseAuth = auth();
const db = firestore();

/**
 * get current user id - you can use auth().currentUser;
 */
export const getAuthUserId = () => firebaseAuth.currentUser?.uid;

/**
 *
 * @param {*} imageUrl provide image url to upload to firebase storage
 * @param {*} name name of the user
 * @param {*} email email of the user to store in firebase
 * @param {*} password password of the user and authenticate
 * @returns confirmResult in Main Authentication detail are stored check It.
 */

export const authRegisterHandler = async (imageUrl, name, email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(confirmResult => {
        confirmResult.user.sendEmailVerification();
        console.log('Auth User Detail From  Firebase File : ', confirmResult);

        // get Authenticate User Id
        const uid = confirmResult.user.uid;

        // Upload Image to Firebase Storage
        let imageName = 'profile/' + uid;

        firebase
          .storage()
          .ref(imageName)
          .putFile(imageUrl)
          .then(snapshot => {
            console.log(
              `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
            );
            console.log('Image has been uploaded.');
          });

        // Retrieve Image From Firebase Cloud Storage
        let imageRef = firebase.storage().ref(imageName);

        const url = imageRef.getDownloadURL.toString();

        // db.collection('Users').doc(uid).update({
        //   userimage: url,
        // });

        // Simple User Registration Detail
        db.collection('Users').doc(uid).set({
          username: name,
          useremail: email,
          userimage: imageUrl,
          userid: uid,
        });
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
 * @param {*} email provide email to authenticates user with firebase
 * @param {*} password provide password to authenticates user with firebase
 */

export const loginHandler = async (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
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
