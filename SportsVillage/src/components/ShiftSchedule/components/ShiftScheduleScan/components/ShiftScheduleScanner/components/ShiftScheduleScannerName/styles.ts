import { StyleSheet } from "react-native";
import { COLORS } from "src/config";

export const styles = StyleSheet.create({

  title: {
    color: COLORS.opposing,
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },

  nameContainer: {
    flexDirection: "row",
    padding: 12,
    margin: 6,
    backgroundColor: COLORS.secondary,
    justifyContent: "space-between",
    borderWidth: 1
  },

  nameText: {
    color: "white",
    fontWeight: "bold"
  }

});

