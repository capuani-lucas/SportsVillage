import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { faCameraRetro  } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../../../config";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../Navigation/Navigation";

const ShiftScheduleScan: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate("Scanner");
  }

  return (
    <View style={styles.shiftScheduleScan}>
      <TouchableOpacity 
        style={styles.shiftScheduleScanButton} 
        onPress={handlePress}>
        <FontAwesomeIcon icon={faCameraRetro} color={COLORS.opposing} size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default ShiftScheduleScan;