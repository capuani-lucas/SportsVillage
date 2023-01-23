import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react"
import { TouchableOpacity, View } from "react-native"
import { faCameraRetro  } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../../../config";

import { styles } from "./styles";

const ShiftScheduleScan: React.FC = () => {

  return (
    <View style={styles.shiftScheduleScan}>
      <TouchableOpacity style={styles.shiftScheduleScanButton}>
        <FontAwesomeIcon icon={faCameraRetro} color={COLORS.opposing} size={30} />
      </TouchableOpacity>
    </View>
  )
}

export default ShiftScheduleScan;