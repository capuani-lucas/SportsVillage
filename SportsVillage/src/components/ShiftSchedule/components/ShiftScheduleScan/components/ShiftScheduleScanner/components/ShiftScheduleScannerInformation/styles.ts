import { StyleSheet } from "react-native";
import { COLORS } from "src/config";

export const styles = StyleSheet.create({
  informationContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.error,
    margin: 20
  },

  warningDescription: {
    fontSize: 16,
    color: COLORS.opposing,
    margin: 20
  },

  warningSymbol: {
    margin: 40
  }
});

