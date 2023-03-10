import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "src/config";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { styles } from "./styles";

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

export default ShiftScheduleScannerInformation;

