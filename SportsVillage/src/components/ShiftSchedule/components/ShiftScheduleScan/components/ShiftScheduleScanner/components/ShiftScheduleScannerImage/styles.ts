import { StyleSheet } from "react-native";
import { COLORS } from "src/config";

export const styles = StyleSheet.create({

  imageContainer: {
    backgroundColor: COLORS.secondary,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraPicker: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginLeft: 16,
    padding: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },

  imagePicker: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 20,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10
    borderRadius: 10
  },

  imageSelectors: {
    flexDirection: 'row',
  }

});

