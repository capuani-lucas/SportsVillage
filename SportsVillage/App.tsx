/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import NavigationComponent from './src/components/Navigation';

const App = () => {
  GoogleSignin.configure();

  return (
    <NavigationComponent />
  );
};



export default App;

