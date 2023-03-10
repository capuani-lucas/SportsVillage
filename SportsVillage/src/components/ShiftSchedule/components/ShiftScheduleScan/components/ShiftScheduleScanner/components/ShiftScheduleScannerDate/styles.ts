import { StyleSheet } from "react-native";
import { COLORS } from "src/config";

export const styles = StyleSheet.create({
  title: {
    color: COLORS.opposing,
    fontSize: 24,
    fontWeight: "bold",
    margin: 20
  },

  calendarWrapper: {
    backgroundColor: COLORS.secondary,
    margin: 14,
    borderRadius: 10,
    padding: 10
  }
});

