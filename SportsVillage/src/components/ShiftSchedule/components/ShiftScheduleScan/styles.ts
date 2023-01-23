import { StyleSheet } from "react-native";
import { COLORS } from "../../../../config";

export const styles = StyleSheet.create({

  shiftScheduleScanButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    padding: 10
  },

  shiftScheduleScan: {
    alignSelf: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 15,
  }

});

