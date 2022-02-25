import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import NavigationService from './NavigationService';
import ProgressDialog from 'react-native-progress-dialog';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Components
import HeaderWithClose from '../components/HeaderWithClose';
import Error from '../components/Error';
// constants
import {
  backColor,
  resturents,
  mobile,
  clock,
  categories,
  address,
} from '../constants/icons';
import {backgroundOne, backgroundTwo} from '../constants/images';
import {SIZES} from '../constants/theme';
import InputFields from '../components/InputFields';

const AddPostScreen = () => {
  const defaultImage =
    'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
  // State Here...
  const [data, setData] = useState({
    restImage: {value: defaultImage, error: '', isValid: false},
    restName: {value: '', error: '', isValid: false},
    restMobile: {value: '', error: '', isValid: false},
    restOpen: {value: '', error: '', isValid: false},
    restClose: {value: '', error: '', isValid: false},
    restCategories: {value: '', error: '', isValid: false},
    restAddress: {value: '', error: '', isValid: false},
  });

  const [visible, setVisible] = useState(false);
  // const [date, setDate] = useState(new Date(1598051730000));
  // const [show, setShow] = useState(false);

  // <Button
  //   title="show time picker!"
  //   onPress={() => {
  //     setShow(true);
  //   }}
  // />;
  // {
  //   show && (
  //     <DateTimePicker
  //       testID="dateTimePicker"
  //       value={date}
  //       mode={'time'}
  //       is24Hour={true}
  //       display="default"
  //       onChange={onChange}
  //     />
  //   );
  // }
  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   setDate(currentDate);
  // };

  // All Action & Validation Here...

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
    if (value == '') {
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
        restName: {...data.restName, value: value, isValid: true},
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
          value: value,
          isValid: true,
        },
      });
    }
  };

  const restCategoriesValid = () => {
    const {value} = data.restCategories;
    if (value == '') {
      setData({
        ...data,
        restCategories: {
          value: value,
          error: '* Please! Enter Categories name',
          isValid: false,
        },
      });
    } else if (value.length <= 3) {
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
        restCategories: {...data.restCategories, value: value, isValid: true},
      });
    }
  };

  const restAddressValid = () => {
    const {value} = data.restAddress;

    if (value == '') {
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
        restAddress: {...data.restAddress, value: value, isValid: true},
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

            {/* OpenTime & CloseTime */}
            <View style={styles.mainContainer}>
              <View style={styles.inputContainer}>
                <View style={styles.imageView}>
                  <Image source={clock} style={styles.inputImage} />
                </View>
                <View>
                  <Text style={styles.inputTextField}>
                    Resturent Open Close Time
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View>
                  <TouchableOpacity>
                    <Text style={{color: 'white'}}>9:30 am</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity>
                    <Text style={{color: 'white'}}>11:00 pm</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView: {
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: 'white',
    borderColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputImage: {
    height: 50,
    width: 23.7,
  },
  inputTextField: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    marginLeft: 7,
    fontFamily: 'JosefinSans-Medium',
    fontSize: 17,
  },
});
export default AddPostScreen;
