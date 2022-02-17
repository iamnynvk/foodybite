import React from 'react';
import {LogBox} from 'react-native';
import Providers from './src/navigation/';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
]);

const App = () => {
  return <Providers />;
};

export default App;
