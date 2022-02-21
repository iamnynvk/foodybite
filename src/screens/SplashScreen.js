// import React, {useContext, useEffect} from 'react';
// import {View, Text, StyleSheet, ImageBackground, StatusBar} from 'react-native';
// import {background} from '../constants/images';
// import {AuthContext} from '../navigation/AuthProvider';

// const SplashScreen = ({navigation}) => {
//   const {authUser} = useContext(AuthContext);

//   console.log('this is splash screen', authUser);

//   /**
//    * once the component is mounted, navigate to the login screen
//    */
//   useEffect(() => {
//     navigateScreen();
//   }, []);

//   /**
//    * setTimeOut for 2 sec holding this screen and after go to TabNavigator Screen
//    */
//   const navigateScreen = () => {
//     if (authUser === null) {
//       setTimeout(() => {
//         navigation.replace('LoginScreen');
//       }, 2000);
//     } else {
//       setTimeout(() => {
//         navigation.replace('TabNavigator');
//       }, 2000);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="#ADCBDB" barStyle="light-content" />
//       <ImageBackground source={background} style={styles.imageStyle}>
//         <View>
//           <Text style={styles.textStyle}>Foodybite</Text>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageStyle: {
//     height: '120%',
//     width: '120%',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textStyle: {
//     fontSize: 40,
//     color: '#3E3F68',
//     textShadowColor: '#000',
//     letterSpacing: 0.9,
//     fontFamily: 'JosefinSans-Bold',
//   },
// });

// export default SplashScreen;
