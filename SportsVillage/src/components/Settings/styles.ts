import { StyleSheet } from "react-native";
import { COLORS } from "src/config";

export const styles = StyleSheet.create({
  settings: {
    backgroundColor: COLORS.background,
    flex: 1
  },

  header: {
    fontWeight: "bold",
    fontSize: 34,
    color: COLORS.opposing,
    margin: 20
  },

  name: {
    backgroundColor: COLORS.secondary,
    color: COLORS.opposing,
    padding: 20,
    margin: 10
  }
});

