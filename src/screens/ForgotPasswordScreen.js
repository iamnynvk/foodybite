import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

// Constants
import {backgroundOne} from '../constants/images';
import {mail, back} from '../constants/icons';
import {SIZES} from '../constants/theme';
import InputFields from '../components/InputFields';
import Error from '../components/Error';
import Header from '../components/Header';

const ForgotPasswordScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: {value: '', error: '', isValid: false},
  });

  const [isDisabled, setIsDisabled] = useState(true);

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
      setIsDisabled(false);
      setData({...data, email: {...data.email, isValid: true}});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1C1A16" />
      <ImageBackground source={backgroundOne} style={styles.imageStyle}>
        <BlurView
          blurType="dark"
          style={styles.blurStyle}
          blurAmount={1}
          reducedTransparencyFallbackColor="dark"
        />

        <Header
          title="Forgot Password"
          iconType={back}
          back={() => {
            navigation.goBack();
          }}
        />

        <View style={styles.descriptionView}>
          <Text style={styles.description}>
            Enter your email and will send you instructions on how to reset it.
          </Text>
        </View>

        <View>
          <InputFields
            labelValue={data.email.value}
            onChangeText={text =>
              setData({
                ...data,
                email: {value: text},
              })
            }
            placeholderText="Email"
            iconType={mail}
            style={{marginTop: SIZES.height * 0.1}}
            onBlur={emailValidation}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Error error={data.email.error} />

        <View>
          <TouchableOpacity
            disabled={isDisabled}
            onPress={() => console.log('Email Send')}>
            <View
              style={[styles.buttonContainer, isDisabled && {opacity: 0.5}]}>
              <Text style={styles.buttonText}>Send</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  buttonContainer: {
    width: '90%',
    height: SIZES.width / 7,
    borderRadius: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
    marginTop: SIZES.height * 0.3,
    backgroundColor: '#5663FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    fontSize: 18,
  },
  descriptionView: {
    marginTop: SIZES.height * 0.1,
  },
  description: {
    color: 'white',
    marginStart: SIZES.width * 0.1,
    marginEnd: SIZES.width * 0.1,
    fontFamily: 'JosefinSans-Regular',
    fontSize: 22,
  },
});

export default ForgotPasswordScreen;
