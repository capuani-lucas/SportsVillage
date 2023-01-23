import { StyleSheet } from "react-native";
import { COLORS } from "../../../../config";

export const styles = StyleSheet.create({
  quickInfo: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    marginVertical: 10,
    flexDirection: "row",
  },
  quickInfoText: {
    color: COLORS.opposing,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 15
  }
});