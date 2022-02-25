import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

const ProfileScreen = () => {
  const {signoutUser} = useContext(AuthContext);
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="log out"
        onPress={() => {
          signoutUser();
        }}
      />
    </View>
  );
};

export default ProfileScreen;
