import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../../config";

import { faHockeyPuck } from "@fortawesome/free-solid-svg-icons";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DateData } from "react-native-calendars";
import { ScheduleInformation } from "../../service/shiftScheduleService";

interface INProps {
  selectedDate: DateData;
  user: string;
  scheduleInformation: ScheduleInformation
}

const ShiftScheduleQuickInfo: React.FC<INProps> = ({ selectedDate, user, scheduleInformation }) => {
  
  const working = scheduleInformation[selectedDate.dateString]?.[user];

  return (
    <View style={styles.quickInfo}>
      <FontAwesomeIcon icon={working ? faHockeyPuck : faSmile} color={working ? COLORS.primary : "yellow"} style={styles.icon}/>
      <Text style={styles.quickInfoText}>{working ? `Working ${working}` : "Not working today"}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default ShiftScheduleQuickInfo;

