// Firebase Universal File for Project
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseAuth = auth();
const db = firestore();
const store = storage();

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
        resolve(confirmResult);
        confirmResult.user.sendEmailVerification();
        console.log('Auth User Detail From  Firebase File : ', confirmResult);

        // get Authenticate User Id - [this is not current user id]
        const uid = confirmResult.user.uid;

        // Upload Image to Firebase Storage
        let imageName = 'profile_photo/' + uid;

        // Upload Image to Firebase Storage
        let task = store.ref(imageName).putFile(imageUrl);

        // Get Image Url
        task.on('state_changed', snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log('Image URL : ', downloadURL);

            // Store user Data in cloud firestore
            db.collection('Users').doc(uid).set({
              username: name,
              useremail: email,
              userimage: downloadURL,
              userid: uid,
            });
          });
        });
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

/**
 *
 * @param {*} uid pass user id throw check user is exist or not
 * @returns
 */

export const getAuthUserData = uid => {
  return new Promise((resolve, reject) => {
    console.log(uid);
    db.collection('Users')
      .doc(uid)
      .get()
      .then(snapshot => {
        const user = snapshot.data();
        if (user === undefined) {
          console.log('User Data Not Found from Firebase file');
        } else {
          console.log('User is Available in Database firebase file');
        }
        resolve(snapshot);
      })
      .catch(error => {
        console.log('Error : ', error);
        reject(error);
      });
  });
};

/**
 *
 * @returns signOutUser logout user here...
 */

export const signOutUser = () => {
  return new Promise((resolve, reject) => {
    auth()
      .signOut()
      .then(data => {
        console.log('User Signed Out');
        resolve(data);
      });
  });
};
