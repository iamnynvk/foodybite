import React, {useState, useEffect, useContext} from 'react';
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
  Platform,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import ProgressDialog from 'react-native-progress-dialog';
import ImagePicker from 'react-native-image-crop-picker';

// Context Provider
import {AuthContext} from '../navigation/AuthProvider';

// components
import Header from '../components/Header';
import InputFields from '../components/InputFields';
import Error from '../components/Error';

// constants
import {backgroundTwo} from '../constants/images';
import {profile} from '../constants/icons';
import {SIZES} from '../constants/theme';
import {back, mail, password} from '../constants/icons';

const RegistrationScreen = ({navigation}) => {
  // AuthContext Provide
  const {authRegisterUser, registrationUser} = useContext(AuthContext);

  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/004/607/806/non_2x/man-face-emotive-icon-smiling-bearded-male-character-in-yellow-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg';

  const [data, setData] = useState({
    imageUrl: {value: defaultImage, error: '', isValid: false},
    name: {value: '', error: '', isValid: false},
    email: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
    repassword: {value: '', error: '', isValid: false},
  });

  // Button State
  const [isDisabled, setIsDisabled] = useState(true);
  // Loading State
  const [visible, setVisible] = useState(false);

  // Set Login Button Visible or not
  useEffect(() => {
    VisibleButton();
    console.log('Image Url', data.imageUrl.value);
  }, [{...data}]);

  // Image Picker - Open Gallery
  const galaryOpenAction = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);

      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setData({
        ...data,
        imageUrl: {
          ...data.imageUrl,
          value: imageUri,
          isValid: true,
        },
      });
    });
  };

  // Name Validations
  const nameValidation = () => {
    const {value} = data.name;

    if (value == '') {
      setData({
        ...data,
        name: {
          value: value,
          error: '* Please! Enter Your Name',
          isValid: false,
        },
      });
    } else if (value.length <= 5) {
      setData({
        ...data,
        name: {
          value: value,
          error: '* Please! Enter Full Name',
          isValid: false,
        },
      });
    } else {
      setData({...data, name: {...data.name, isValid: true}});
    }
  };

  // Email Validations
  const emailValidation = () => {
    const {value} = data.email;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) == false) {
      setData({
        ...data,
        email: {
          value: value,
          error: '* Please Enter Valid Email',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        email: {
          ...data.email,
          isValid: true,
        },
      });
    }
  };

  // Password Validation
  const passwordValidation = () => {
    const {value} = data.password;
    let passwordSize = value.length;

    if (passwordSize == 0) {
      setData({
        ...data,
        password: {
          value: value,
          error: '* Please Enter Password',
          isValid: false,
        },
      });
    } else if (passwordSize < 8 || passwordSize > 20) {
      setData({
        ...data,
        password: {
          value: value,
          error: '* Password should be min 8 char and max 20 char',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        password: {
          ...data.password,
          isValid: true,
        },
      });
    }
  };

  // Repassword Validation
  const rePasswordValidation = () => {
    const {value} = data.repassword;
    let repasswordSize = value.length;

    const password = data.password.value;

    if (repasswordSize == 0) {
      setData({
        ...data,
        repassword: {
          value: value,
          error: '* Please Enter Password',
          isValid: false,
        },
      });
    } else if (repasswordSize < 8 || repasswordSize > 20) {
      setData({
        ...data,
        repassword: {
          value: value,
          error: '* Password should be min 8 char and max 20 char',
          isValid: false,
        },
      });
    } else if (value != password) {
      setData({
        ...data,
        repassword: {
          value: value,
          error: '* Password not match',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        repassword: {
          ...data.repassword,
          isValid: true,
        },
      });
    }
  };

  // Register Button Visible or not
  const VisibleButton = () => {
    const nameErr = data.name.error;
    const emailErr = data.email.error;
    const passwordErr = data.password.error;
    const repasswordErr = data.repassword.error;

    if (
      nameErr == null &&
      emailErr == null &&
      passwordErr == null &&
      repasswordErr == null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const registrationHandler = () => {
    const imageUrl = data.imageUrl.value;
    const name = data.name.value;
    const email = data.email.value;
    const password = data.password.value;

    if (imageUrl && name && email && password) {
      setVisible(true);
      authRegisterUser(email, password);
      registrationUser(imageUrl, name, email);
      setTimeout(() => {
        navigation.navigate('LoginScreen');
        setVisible(false);
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressDialog
        visible={visible}
        label="Please Wait..."
        loaderColor="black"
      />
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
            <View>
              <TouchableOpacity
                onPress={() => {
                  galaryOpenAction();
                }}>
                <View style={styles.imageView}>
                  <Image
                    source={{uri: data.imageUrl.value}}
                    style={styles.imageSet}
                  />
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
                style={{marginTop: SIZES.height * 0.05}}
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
                style={{marginTop: SIZES.height * 0.05}}
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
                style={{marginTop: SIZES.height * 0.05}}
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
                marginBottom: SIZES.height * 0.1,
              }}>
              <View style={styles.alreadyAccountView}>
                <Text style={styles.alreadyAccount}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}>
                  <Text style={[styles.alreadyAccount, {color: '#5663FF'}]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  imageSet: {
    flex: 1,
    width: SIZES.width * 0.3,
    height: SIZES.height * 0.1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: (SIZES.width * 0.3) / 2,
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '90%',
    height: SIZES.width / 7,
    borderRadius: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.1,
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
    flexDirection: 'row',
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
