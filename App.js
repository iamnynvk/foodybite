import React from 'react';
import {LogBox, View} from 'react-native';
import Providers from './src/navigation/';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  'Non-serializable values were found in the navigation state.',
]);

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Providers />
      <FlashMessage position="top" />
    </View>
  );
};

export default App;
