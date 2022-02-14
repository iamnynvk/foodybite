import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

// components
import Header from '../components/Header';
import InputFields from '../components/InputFields';
import Error from '../components/Error';

// constants
import {backgroundTwo} from '../constants/images';
import {upload, profile} from '../constants/icons';
import {SIZES} from '../constants/theme';
import {back, mail, password} from '../constants/icons';

const RegistrationScreen = ({navigation}) => {
  const bottomSheetRef = React.useRef();
  const fall = new Animated.Value(1);

  const [data, setData] = useState({
    imageUrl: {value: '', error: '', isValid: false},
    name: {value: '', error: '', isValid: false},
    email: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
    repassword: {value: '', error: '', isValid: false},
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const nameValidation = () => {
    const {value} = data.name;

    if (value == null) {
      setData({
        ...data,
        name: {
          error: '* Please! Enter Your Name',
          isValid: false,
        },
      });
    } else {
      setData({...data, name: {value: value, isValid: true}});
    }
  };

  const emailValidation = () => {};

  const passwordValidation = () => {};

  const rePasswordValidation = () => {};

  const registrationHandler = () => {};

  // Bottom Sheet Header
  const renderHeader = () => {
    <View style={styles.headerOpen}>
      <View style={styles.pannelHeader}>
        <View style={styles.pannelHandle}></View>
      </View>
    </View>;
  };

  // Bottom Sheet Content
  const renderContent = () => {
    <View style={styles.buttomSheetView}>
      <View style={styles.bottomSheetInnerView}>
        <Text style={[styles.headerTitle, {marginStart: 10}]}>Choose Gain</Text>
        <TouchableOpacity onPress={() => bottomSheetRef.current.snapTo(1)}>
          <Text style={[styles.headerTitle, {marginEnd: 10}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A16" />
      <ImageBackground source={backgroundTwo} style={styles.imageStyle}>
        <BlurView
          blurType="dark"
          style={styles.blurStyle}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="dark"
        />
        <Header
          title="Registration"
          iconType={back}
          back={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View>
            {/* Select Image */}
            <View onTouchStart={() => bottomSheetRef.current.snapTo(0)}>
              <TouchableOpacity
                onPress={() => {
                  bottomSheetRef.current.snapTo(0);
                }}>
                <View style={styles.imageView}>
                  <Image source={upload} style={styles.upload} />
                </View>
              </TouchableOpacity>

              <Error error={data.imageUrl.error} />
            </View>

            {/* Name Input */}
            <View>
              <InputFields
                labelValue={data.name.value}
                onChangeText={text => {
                  setData({...data, name: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.1}}
                onBlur={nameValidation}
                placeholderText="Name"
                iconType={profile}
                iconStyle={{height: SIZES.width * 0.075}}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* setName Error */}
              <Error error={data.name.error} />
            </View>

            {/* Email Input */}
            <View>
              <InputFields
                labelValue={data.email.value}
                onChangeText={text => {
                  setData({...data, email: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.03}}
                onBlur={emailValidation}
                placeholderText="Email"
                iconType={mail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* set Error */}
              <Error error={data.email.error} />
            </View>

            {/* Password Input */}
            <View>
              <InputFields
                labelValue={data.password.value}
                onChangeText={text => {
                  setData({...data, password: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.03}}
                onBlur={passwordValidation}
                placeholderText="Password"
                iconType={password}
                iconStyle={{height: SIZES.width * 0.065}}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
              />

              {/* setPassword Error */}
              <Error error={data.password.error} />
            </View>

            {/* Repassword Input */}
            <View>
              <InputFields
                labelValue={data.repassword.value}
                onChangeText={text => {
                  setData({...data, repassword: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.03}}
                onBlur={rePasswordValidation}
                placeholderText="Confirm Password"
                iconType={password}
                iconStyle={{height: SIZES.width * 0.065}}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                autoCorrect={false}
              />

              {/* setPassword Error */}
              <Error error={data.repassword.error} />
            </View>

            {/* Register Button */}
            <View>
              <TouchableOpacity
                onPress={registrationHandler}
                disabled={isDisabled}>
                <View
                  style={[
                    styles.buttonContainer,
                    isDisabled && {opacity: 0.5},
                  ]}>
                  <Text style={styles.buttonText}>Register</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <View
              style={{
                marginTop: SIZES.height * 0.12,
                marginBottom: SIZES.height * 0.05,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <View style={styles.alreadyAccountView}>
                  <Text style={styles.alreadyAccount}>Create New Account</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <BottomSheet
              ref={bottomSheetRef}
              snapPoints={['60%', 0, 0]}
              borderRadius={10}
              renderHeader={renderHeader}
              renderContent={renderContent}
              initialSnap={1}
              callbackNode={fall}
              enabledGestureInteraction={true}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: (SIZES.width * 0.3) / 2,
    alignSelf: 'center',
    marginTop: SIZES.width * 0.1,
    overflow: 'visible',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uploadView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  upload: {
    height: SIZES.width * 0.1,
    width: SIZES.width * 0.1,
  },
  buttonContainer: {
    width: '90%',
    height: SIZES.width / 7,
    borderRadius: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.05,
    backgroundColor: '#5663FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  alreadyAccountView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyAccount: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'JosefinSans-Regular',
  },
  pannelHeader: {
    alignItems: 'center',
  },
  pannelHandle: {
    width: 40,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 20,
  },
  buttomSheetView: {
    height: SIZES.height * 0.5,
    backgroundColor: 'white',
  },
  bottomSheetInnerView: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
});

export default RegistrationScreen;
