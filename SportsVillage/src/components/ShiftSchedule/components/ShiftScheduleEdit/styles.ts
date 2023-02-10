import { StyleSheet } from "react-native";
import { COLORS } from "../../../../config";
 
export const styles = StyleSheet.create({

  editInput: {
    backgroundColor: COLORS.background,
    margin: 10,
    padding: 14,
    borderRadius: 10,
    color: COLORS.opposing,
    marginTop: 50
  },

  notesInput: {
    backgroundColor: COLORS.background,
    margin: 10,
    borderRadius: 10,
    color: COLORS.opposing,
    height: 300,
    padding: 14,
    paddingTop: 20
  },

  spacer: {
    flex: 1
  },

  deleteButton: {
    backgroundColor: COLORS.error,
    padding: 14,
    margin: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  
  bottomSheetBackground: {
    backgroundColor: COLORS.secondary
  },

  bottomSheetHandleIndicator: {
    backgroundColor: COLORS.opposing
  }
})

