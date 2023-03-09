import { StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../../../../../../../config";

import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ShiftScheduleScannerInformation: React.FC = () => {
  return (
    <View style={styles.informationContainer}>
      <Text style={styles.title}>WARNING!</Text>
      <FontAwesomeIcon icon={faWarning} color={COLORS.opposing} size={60} style={styles.warningSymbol}/>
      <Text style={styles.warningDescription}>Here you can scan your schedule. 
      Please note that schedule scanning may not be 100% accurate. It is your responsibility to make sure your shifts are recorded correctly. 
      This program is not responsible for any missed shifts. By clicking next you agree that all responsibility is yours.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default ShiftScheduleScannerInformation;