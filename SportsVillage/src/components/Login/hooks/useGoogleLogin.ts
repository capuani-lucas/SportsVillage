import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

const useGoogleLogin = () => {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrored, setIsErrored] = useState<boolean>(false);

  const handleGoogleLogin = (onSuccess?: () => void) => {
    setIsLoading(true);
    setIsErrored(false);
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true})
    .then(() => {
      GoogleSignin.signIn()
      .then((user) => {
        const googleCredential = auth.GoogleAuthProvider.credential(user.idToken);
        auth()
          .signInWithCredential(googleCredential)
          .then((response) => {
            setIsSignedIn(true);
            setIsLoading(false);
            if (onSuccess) {
              onSuccess();
            }
          })
          .catch((error) => {
            setIsSignedIn(false);
            setIsLoading(false);
            setIsErrored(true);
          })
      })
      .catch((error) => {
        setIsSignedIn(false);
        setIsLoading(false);
        setIsErrored(true);
      })
    })
  }

  return { 
    googleLoading: isLoading, 
    googleSignedIn: isSignedIn, 
    handleGoogleLogin, 
    googleErrored: isErrored 
  };

}

export default useGoogleLogin;

