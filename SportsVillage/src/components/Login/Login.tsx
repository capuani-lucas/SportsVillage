import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import useGoogleLogin from './hooks/useGoogleLogin';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../Navigation/Navigation';
import { CDN_URL } from '../../config';
import WrapHorizontal from '../animated/WrapHorizontal';
import { styles } from "./styles";

const Login: React.FC = () => {

  const { isLoading, isSignedIn, handleGoogleLogin, isErrored } = useGoogleLogin();
  const navigation = useNavigation<NavigationProps>();

  const loggedIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Test" }]
    })
  }

  return (
    <View style={styles.login}>
      <SafeAreaView />
      <Text style={styles.loginHeader}>Login.</Text>
      <WrapHorizontal startingValue={-160} customStyle={styles.loginAnimatedImageContainer}>
        <Image source={{uri: `${CDN_URL}/zamboni-icon.png`}}  style={styles.loginAnimatedImage} />
      </WrapHorizontal>
      <View style={styles.loginSpacer}></View>
      <View style={styles.loginOAuthContainer}>
        {isErrored && (
          <Text style={styles.loginError}>There was an error logging in. Please try again.</Text>
        )}
        <GoogleSigninButton 
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          disabled={isLoading}
          onPress={() => handleGoogleLogin(loggedIn)}
        />
      </View>
    </View>
  );
};

export default Login;