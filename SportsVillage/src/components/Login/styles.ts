import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  
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

  loginSpacer: {
    flex: 1,
  },

  loginOAuthContainer: {
    alignItems: "center",
    marginBottom: 150
  },

  loginAnimatedImageContainer: {
    marginTop: 40
  },

  loginAnimatedImage: {
    height: 130,
    width: 130,
    resizeMode: "contain",
    tintColor: "white"
  },

  loginError: {
    color: "red",
  }

});