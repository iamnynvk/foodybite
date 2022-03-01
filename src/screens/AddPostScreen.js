import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import NavigationService from './NavigationService';
import ProgressDialog from 'react-native-progress-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AuthContext} from '../navigation/AuthProvider';
import {showMessage, hideMessage} from 'react-native-flash-message';

// Components
import HeaderWithClose from '../components/HeaderWithClose';
import Error from '../components/Error';
// constants
import {
  backColor,
  resturents,
  mobile,
  categories,
  address,
} from '../constants/icons';
import {backgroundOne} from '../constants/images';
import {SIZES} from '../constants/theme';
import InputFields from '../components/InputFields';

const AddPostScreen = () => {
  const {uploadPost} = useContext(AuthContext);

  const defaultImage =
    'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';

  // State Here...
  const [data, setData] = useState({
    restImage: {value: defaultImage, error: '', isValid: false},
    restName: {value: '', error: '', isValid: false},
    restMobile: {value: '', error: '', isValid: false},
    restClose: {value: new Date(), error: '', isValid: false},
    restCategories: {value: '', error: '', isValid: false},
    restAddress: {value: '', error: '', isValid: false},
  });

  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // All Action & Validation Here..
  // SUbmit Handler
  const submitPostHandler = () => {
    const resImage = data.restImage.value;
    const resName = data.restName.value;
    const resMobile = data.restMobile.value;
    const resCategorie = data.restCategories.value;
    const resAddress = data.restAddress.value;
    const resCloseTime = data.restClose.value;

    setVisible(true);
    setTimeout(() => {
      uploadPost(
        resImage,
        resName,
        resMobile,
        resCategorie,
        resAddress,
        resCloseTime,
      );
      setVisible(false);
      showMessage({
        message: 'Successfully Data Uploaded',
        type: 'success',
      });
      NavigationService.navigate('Homescreen');
    }, 2000);
  };

  // Image Picker - Open Gallery

  const galaryOpenAction = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('Image Data Receive :', image);

      const imageUri =
        Platform.OS === 'ios' ? image.replace('file://', '') : image.path;

      console.log('Image URI :', imageUri);
      setData({
        ...data,
        restImage: {
          ...data.imageUrl,
          value: imageUri,
          isValid: true,
        },
      });
    });
  };

  const restNameValid = () => {
    const {value} = data.restName;
    if (value == null || value == '') {
      setData({
        ...data,
        restName: {
          value: value,
          error: '* Please! Enter Resturent Name',
          isValid: false,
        },
      });
    } else if (value.length <= 5) {
      setData({
        ...data,
        restName: {
          value: value,
          error: '* Please! Enter Full Name',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        restName: {...data.restName, isValid: true},
      });
    }
  };

  const restMobileValid = () => {
    const {value} = data.restMobile;

    const reg = /^[6-9]{1}[0-9]{9}$/;

    if (reg.test(value) === false) {
      setData({
        ...data,
        restMobile: {
          value: value,
          error: '* Please! Enter Valid Mobile Number',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        restMobile: {
          ...data.restMobile,
          isValid: true,
        },
      });
    }
  };

  const restCategoriesValid = () => {
    const {value} = data.restCategories;
    if (value == null || value == '') {
      setData({
        ...data,
        restCategories: {
          value: value,
          error: '* Please! Enter Categories name',
          isValid: false,
        },
      });
    } else if (value.length <= 5) {
      setData({
        ...data,
        restCategories: {
          value: value,
          error: '* Please! Enter Full Categories Name',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        restCategories: {...data.restCategories, isValid: true},
      });
    }
  };

  const restAddressValid = () => {
    const {value} = data.restAddress;

    if (value == '' || value == null) {
      setData({
        ...data,
        restAddress: {
          value: value,
          error: '* Please! Enter Resturent Address',
          isValid: false,
        },
      });
    } else if (value.length <= 5) {
      setData({
        ...data,
        restAddress: {
          value: value,
          error: '* Please! Enter Full Address',
          isValid: false,
        },
      });
    } else {
      setData({
        ...data,
        restAddress: {...data.restAddress, isValid: true},
      });
    }
  };

  // resturent close time
  const onChangeClose = (event, selectDate) => {
    console.log('close time :', selectDate);
    setData({
      ...data,
      restClose: {
        ...data.restClose,
        value: new Date(selectDate),
        isValid: true,
      },
    });
    setShow(false);
  };

  const showMode = () => {
    setShow(true);
  };

  // Set Login Button Visible or not
  useEffect(() => {
    VisibleButton();
  }, [{...data}]);

  const VisibleButton = () => {
    let restImageErr = data.restImage.error;
    let restNameErr = data.restName.error;
    let restMobileErr = data.restMobile.error;
    let restCloseErr = data.restClose.error;
    let restCategoriesErr = data.restCategories.error;
    let restAddressErr = data.restAddress.error;

    if (
      restImageErr === undefined ||
      (restImageErr === null && restNameErr === undefined) ||
      (restNameErr === null && restMobileErr === undefined) ||
      (restMobileErr === null && restCloseErr === null) ||
      (restCloseErr === null && restCategoriesErr === undefined) ||
      (restCategoriesErr === null && restAddressErr === undefined) ||
      restAddressErr === null
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressDialog
        visible={visible}
        label="Please Wait..."
        loaderColor="black"
      />
      <ImageBackground
        source={backgroundOne}
        style={styles.imageStyle}
        blurRadius={10}>
        {/* Header section */}
        <View>
          <HeaderWithClose
            title={'Add Post'}
            backIconType={backColor}
            back={() => {
              NavigationService.navigate('Homescreen');
            }}
          />
        </View>

        <ScrollView nestedScrollEnabled={true} style={{marginBottom: 60}}>
          <View>
            {/* Select Image */}
            <View>
              <TouchableOpacity
                onPress={() => {
                  galaryOpenAction();
                }}>
                <View style={styles.imageView}>
                  <Image
                    source={{uri: data.restImage.value}}
                    style={styles.imageSet}
                  />
                </View>
              </TouchableOpacity>

              <Error error={data.restImage.error} />
            </View>

            {/* Resturent Name */}
            <View>
              <InputFields
                labelValue={data.restName.value}
                onChangeText={text => {
                  setData({...data, restName: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.1}}
                onBlur={restNameValid}
                placeholderText="Resturent Name"
                iconType={resturents}
                iconStyle={{height: SIZES.width * 0.075}}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* setRestName Error */}
              <Error error={data.restName.error} />
            </View>

            {/* Resturent Mobile */}
            <View>
              <InputFields
                labelValue={data.restMobile.value}
                onChangeText={text => {
                  setData({...data, restMobile: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.05}}
                onBlur={restMobileValid}
                placeholderText="Mobile Number"
                iconType={mobile}
                iconStyle={{height: SIZES.width * 0.075}}
                keyboardType="phone-pad"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* setName Error */}
              <Error error={data.restMobile.error} />
            </View>

            {/* Resturent Categories */}
            <View>
              <InputFields
                labelValue={data.restCategories.value}
                onChangeText={text => {
                  setData({...data, restCategories: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.05}}
                onBlur={restCategoriesValid}
                placeholderText="Categories"
                iconType={categories}
                iconStyle={{height: SIZES.width * 0.075}}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* setName Error */}
              <Error error={data.restCategories.error} />
            </View>

            {/* Resturent Address */}
            <View>
              <InputFields
                labelValue={data.restAddress.value}
                onChangeText={text => {
                  setData({...data, restAddress: {value: text}});
                }}
                style={{marginTop: SIZES.height * 0.05}}
                onBlur={restAddressValid}
                placeholderText="Address"
                iconType={address}
                iconStyle={{height: SIZES.width * 0.075}}
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* setName Error */}
              <Error error={data.restAddress.error} />
            </View>

            {/* CloseTime */}
            <View style={styles.mainContainer}>
              <View>
                <Text style={styles.inputTextField}>Resturent Close Time</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {show && (
                  <DateTimePicker
                    testID="time"
                    value={data.restClose.value}
                    mode={'time'}
                    is24Hour={true}
                    onChange={onChangeClose}
                  />
                )}

                <View style={styles.timing}>
                  <TouchableOpacity onPress={showMode}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'JosefinSans-Medium',
                      }}>
                      {data?.restClose?.value?.getHours() +
                        ':' +
                        data?.restClose?.value?.getMinutes()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <View style={styles.submitContainer}>
              <TouchableOpacity
                onPress={submitPostHandler}
                disabled={isDisabled}>
                <View style={[styles.submitView, isDisabled && {opacity: 0.5}]}>
                  <Text style={styles.textStyles}>Submit Post</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageView: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: (SIZES.width * 0.3) / 2,
    alignSelf: 'center',
    marginTop: SIZES.width * 0.1,
    overflow: 'hidden',
  },
  imageStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: SIZES.width,
    height: SIZES.height,
  },
  imageSet: {
    flex: 1,
    width: SIZES.width * 0.3,
    height: SIZES.height * 0.1,
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: (SIZES.width * 0.3) / 2,
    overflow: 'hidden',
  },
  mainContainer: {
    width: '90%',
    height: SIZES.width / 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingStart: 10,
    marginStart: SIZES.width * 0.05,
    marginEnd: SIZES.width * 0.05,
    marginVertical: SIZES.height * 0.05,
  },
  inputImage: {
    height: 50,
    width: 23.7,
    alignSelf: 'center',
  },
  inputTextField: {
    borderColor: 'white',
    color: 'white',
    marginLeft: 7,
    fontFamily: 'JosefinSans-Medium',
    fontSize: 17,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imagesView: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'white',
    borderColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  timing: {
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    margin: SIZES.height * 0.05,
    borderWidth: 1,
    height: SIZES.width * 0.1,
    backgroundColor: '#5663FF',
    alignContent: 'center',
  },
  textContainer: {
    color: 'white',
  },
  submitContainer: {
    backgroundColor: '#5663FF',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  submitView: {
    height: SIZES.height / 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#5663FF',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    color: 'white',
    fontFamily: 'JosefinSans-Medium',
  },
});
export default AddPostScreen;
