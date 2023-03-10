import { StyleSheet } from "react-native";
import { COLORS } from "../../../../config";

export const styles = StyleSheet.create({

  shift: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    color: COLORS.opposing,
  },

  shiftWorking: {
    marginBottom: 80
  }
});