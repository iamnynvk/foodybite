import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import {BlurView} from '@react-native-community/blur';
import ProgressDialog from 'react-native-progress-dialog';
import {showMessage, hideMessage} from 'react-native-flash-message';

// Constants
import {backgroundOne} from '../constants/images';
import {mail, password} from '../constants/icons';
import {SIZES} from '../constants/theme';
import InputFields from '../components/InputFields';
import Error from '../components/Error';

const LoginScreen = ({navigation}) => {
  const {loginUser} = useContext(AuthContext);

  const [data, setData] = useState({
    email: {value: '', error: '', isValid: false},
    password: {value: '', error: '', isValid: false},
  });

  // Button State
  const [isDisabled, setIsDisabled] = useState(true);
  // Loading State
  const [visible, setVisible] = useState(false);

  // Set Login Button Visible or not
  useEffect(() => {
    VisibleButton();
  }, [{...data}]);

  const VisibleButton = () => {
    let emailErr = data.email.error;
    let passwordErr = data.password.error;

    if (emailErr == null && passwordErr == null) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Email Validation
  const emailValidation = () => {
    const {value} = data.email;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(value) === false) {
      setData({
        ...data,
        email: {
          value: value,
          error: '* Please! Enter Valid Email',
          isValid: false,
        },
      });
    } else {
      setData({...data, email: {...data.email, isValid: true}});
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
          error: '* Password is required feild',
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

  // Login Button Click
  const loginHandler = () => {
    const emailValue = data.email.value;
    const passwordValue = data.password.value;

    if (emailValue && passwordValue) {
      setVisible(true);
      loginUser(emailValue, passwordValue);
      showMessage({
        message: 'Login Successfully',
        type: 'success',
      });
      setTimeout(() => {
        setVisible(false);
        navigation.replace('HomeScreen');
      }, 1000);
    } else {
      showMessage({
        message: 'Please! Enter Email and Password',
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ProgressDialog
        visible={visible}
        label="Please Wait..."
        loaderColor="black"
      />
      <StatusBar barStyle="light-content" backgroundColor="#1C1A16" />
      <ImageBackground source={backgroundOne} style={styles.imageStyle}>
        <BlurView
          blurType="dark"
          style={styles.blurStyle}
          blurType="dark"
          blurAmount={1}
          reducedTransparencyFallbackColor="dark"
        />

        {/* Title & Email */}
        <View style={styles.titleView}>
          <Text style={styles.title}>Foodybite</Text>

          {/* Email Input */}
          <InputFields
            labelValue={data.email.value}
            onChangeText={text => {
              setData({...data, email: {value: text}});
            }}
            style={{marginTop: SIZES.height * 0.1}}
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

        {/* Password */}
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
            iconStyle={{height: SIZES.width * 0.07}}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
          />

          {/* set Error */}
          <Error error={data.password.error} />
        </View>

        {/* Forgot Password & Login Button */}
        <View>
          <View style={styles.forgotView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={loginHandler} disabled={isDisabled}>
            <View
              style={[styles.buttonContainer, isDisabled && {opacity: 0.5}]}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Create New Account */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <View style={styles.newAccountView}>
            <Text style={styles.newAccount}>Create New Account</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  titleView: {
    marginTop: SIZES.height * 0.1,
  },
  title: {
    fontSize: 35,
    letterSpacing: 0.3,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    alignSelf: 'center',
  },
  imageView: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'white',
    borderColor: 'white',
  },
  inputImage: {
    height: 20,
    width: 25,
  },
  inputContainer: {
    width: '90%',
    height: SIZES.width / 7,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
  },
  inputTextField: {
    width: '86%',
    color: 'white',
    marginLeft: 7,
    fontFamily: 'JosefinSans-Medium',
    fontSize: 17,
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
  forgotView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.05,
  },
  forgotText: {
    color: 'white',
    fontFamily: 'JosefinSans-Medium',
  },
  newAccountView: {
    marginTop: SIZES.height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newAccount: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'JosefinSans-Regular',
  },
});
export default LoginScreen;
