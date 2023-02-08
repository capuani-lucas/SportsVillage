import React from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../../../config";

import { faHockeyPuck } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DateData } from "react-native-calendars";
import { ScheduleInformation } from "../../types";

import { styles } from "./styles";
interface INProps {
  selectedDate: DateData;
  user: string;
  scheduleInformation: ScheduleInformation
}

const ShiftScheduleQuickInfo: React.FC<INProps> = ({ selectedDate, user, scheduleInformation }) => {
  
  const working = scheduleInformation[selectedDate.dateString]?.[user];

  return (
    <View style={styles.quickInfo}>
      <FontAwesomeIcon 
        icon={working ? faHockeyPuck : faSmile} 
        color={working ? COLORS.primary : "yellow"} 
        style={styles.icon}/>
      <Text style={styles.quickInfoText}>{working ? `Working ${working}` : "Not working today"}</Text>
    </View>
  )
}


export default ShiftScheduleQuickInfo;

