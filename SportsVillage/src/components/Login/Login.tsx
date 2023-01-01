import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import useGoogleLogin from './hooks/useGoogleLogin';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../Navigation/Navigation';

const Login: React.FC = () => {

  const { isLoading, isSignedIn, handleGoogleLogin } = useGoogleLogin();
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

      <View style={styles.spacer}></View>
      <View style={styles.oAuthContainer}>
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


// react native stylesheet
const styles = StyleSheet.create({
  
  login: {
    flex: 1,
    backgroundColor: "black",
  },

  loginHeader: {
    color: "#686de0",
    fontSize: 50,
    fontWeight: "bold",
    margin: 40
  },

  spacer: {
    flex: 1,
  },

  oAuthContainer: {
    alignItems: "center",
    marginBottom: 150
  }

});

export default Login;