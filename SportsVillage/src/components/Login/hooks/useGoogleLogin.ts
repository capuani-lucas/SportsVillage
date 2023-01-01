import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

const useGoogleLogin = () => {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGoogleLogin = (callbackFn?: () => void) => {
    setIsLoading(true);
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
            if (callbackFn) {
              callbackFn();
            }
          }
        )
      })
      .catch((error) => {
        setIsSignedIn(false);
        setIsLoading(false);
      })
    })
  }

  return { isLoading, isSignedIn, handleGoogleLogin };

}

export default useGoogleLogin;