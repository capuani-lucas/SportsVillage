import { StyleSheet } from "react-native";
import { COLORS } from "../../config";

export const styles = StyleSheet.create({
  
  login: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loginHeader: {
    color: COLORS.primary,
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
    tintColor: COLORS.opposing
  },

  loginError: {
    color: COLORS.error,
  }

});