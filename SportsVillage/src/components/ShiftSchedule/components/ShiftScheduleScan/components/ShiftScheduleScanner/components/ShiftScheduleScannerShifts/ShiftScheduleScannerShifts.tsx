import React from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DateData } from "react-native-calendars"
import { UserPreferences } from "src/components/common/hooks/useUserPreferences";
import { createDateAtMidnight } from "src/components/ShiftSchedule/service/shiftScheduleService";
import { COLORS } from "src/config";
import { ShiftScheduleResponse } from "../../types";

type ShiftScheduleScannerShiftsProps = {

  startDate: DateData;
  endDate: DateData;
  user: string;
  scheduleData: ShiftScheduleResponse;
  completeStep: () => void;
  userPreferences: UserPreferences;

}

const ShiftScheduleScannerShifts: React.FC<ShiftScheduleScannerShiftsProps> = ({
  startDate, endDate, user, scheduleData, completeStep, userPreferences
}) => {

  const schedule = scheduleData.slice(userPreferences.scheduleOffset, scheduleData.length);


  const generateDateStringsBetweenTwoDates = (date1: string, date2: string) => {
    const dateStrings = [];
    const date1Date = createDateAtMidnight(date1);
    const date2Date = createDateAtMidnight(date2);
    while (date1Date <= date2Date) {
      dateStrings.push(date1Date.toISOString().slice(0, 10));
      date1Date.setDate(date1Date.getDate() + 1);
    }
    return dateStrings;
  }

  

  return (
    <View>
      <Text style={styles.title}>Double check your shifts:</Text>
      <ScrollView>


      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: COLORS.opposing,
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },

  dateContainer: {
    flexDirection: "row",
    padding: 12,
    margin: 6,
    backgroundColor: COLORS.secondary,
    justifyContent: "space-between",
    borderWidth: 1
  },

  dateText: {
    color: "white",
    fontWeight: "bold"
  }
})


export default ShiftScheduleScannerShifts;

