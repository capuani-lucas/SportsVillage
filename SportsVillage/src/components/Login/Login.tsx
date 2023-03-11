import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { AppleButton } from '@invertase/react-native-apple-authentication';
import React from 'react';
import {View, Text, SafeAreaView, Image, ActivityIndicator} from 'react-native';
import useGoogleLogin from './hooks/useGoogleLogin';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../Navigation/Navigation';
import { CDN_URL } from '../../config';
import WrapHorizontal from '../animated/WrapHorizontal';
import { styles } from "./styles";
import useAppleLogin from './hooks/useAppleLogin';

const Login: React.FC = () => {

  const { googleLoading, googleSignedIn, handleGoogleLogin, googleErrored } = useGoogleLogin();
  const { appleLoading, appleSignedIn, handleAppleLogin, appleErrored } = useAppleLogin();
  const navigation = useNavigation<NavigationProps>();

  const loggedIn = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Test" }]
    })
  }

  const errored = googleErrored || appleErrored;
  const loading = googleLoading || appleLoading;

  return (
    <View style={styles.login}>
      <SafeAreaView />
      <Text style={styles.loginHeader}>Login.</Text>
      <WrapHorizontal 
        startingValue={-260}
        animationDuration={17000}
        customStyle={styles.loginAnimatedImageContainer}
      >
        <Image source={{uri: `${CDN_URL}/zamboni-icon.png`}}  style={styles.loginAnimatedImage} />
      </WrapHorizontal>
      <View style={styles.loginSpacer}></View>
      <View style={styles.loginOAuthContainer}>
        {errored && (
          <Text style={styles.loginError}>There was an error logging in. Please try again.</Text>
        )}
        {loading ? (
          <ActivityIndicator 
            size="small"
          />
        ) : (
          <>
            <AppleButton 
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleLoginButton}
              onPress={() => handleAppleLogin(loggedIn)}
            />
            <GoogleSigninButton 
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              disabled={loading}
              onPress={() => handleGoogleLogin(loggedIn)}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default Login;

