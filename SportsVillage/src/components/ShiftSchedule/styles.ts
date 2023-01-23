import { StyleSheet } from "react-native";
import { COLORS } from "../../config";

export const styles = StyleSheet.create({

  shiftSchedule: {
    flex: 1,
    backgroundColor: COLORS.background
  },

  header: {
    fontWeight: "bold",
    fontSize: 34,
    color: COLORS.opposing,
    marginLeft: 10,
    marginBottom: 10
  }

});