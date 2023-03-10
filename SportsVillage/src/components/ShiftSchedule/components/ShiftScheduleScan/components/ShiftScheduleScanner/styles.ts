import { StyleSheet } from "react-native";
import { COLORS } from "src/config";


export const styles = StyleSheet.create({

  scannerPage: {
    backgroundColor: COLORS.background,
    flex: 1
  },

  backButton: {
    margin: 20
  },

  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: "center"
  },

  loadingSpinner: {
    flex: 1
  },

  errorBanner: {
    backgroundColor: COLORS.error,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  }, 

  errorMessage: {
    color: COLORS.opposing,
  }

});

