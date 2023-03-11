import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { appleAuth } from '@invertase/react-native-apple-authentication';

const useAppleLogin = () => {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErrored, setIsErrored] = useState<boolean>(false);

  const handleAppleLogin = async (onSuccess?: () => void) => {
    setIsLoading(true);
    setIsSignedIn(false);
    try {

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      await auth().signInWithCredential(appleCredential);

      onSuccess && onSuccess();
      setIsSignedIn(true);
      setIsLoading(false);
      setIsErrored(false);

    } catch (e) {
      console.log("Signing in with Apple failed: ", e);
      setIsSignedIn(false);
      setIsLoading(false);
      setIsErrored(true);
    }
  }

  return { 
    appleLoading: isLoading, 
    appleSignedIn: isSignedIn, 
    handleAppleLogin, 
    appleErrored: isErrored 
  };

}

export default useAppleLogin;

