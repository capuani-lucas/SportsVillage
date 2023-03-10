import React from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars"
import { COLORS } from "src/config";
import { ScheduleScanner } from "../../types";

import { styles } from "./styles";

type ShiftScheduleScannerDateProps = {
  scheduleScanner: ScheduleScanner;
  firstDay?: boolean;
}


const ShiftScheduleScannerDate: React.FC<ShiftScheduleScannerDateProps> = ({ scheduleScanner, firstDay }) => {


  const selectedDate = firstDay ? scheduleScanner.firstSelectedDate : scheduleScanner.secondSelectedDate;
  const setSelectedDate = firstDay ? scheduleScanner.methods.setFirstSelectedDate : scheduleScanner.methods.setSecondSelectedDate;

  return (
    <View>
      <Text style={styles.title}>{firstDay ? "First day of schedule?": "Last day of schedule?"}</Text>
      <View style={styles.calendarWrapper}>
        <Calendar 
          minDate={!firstDay ? scheduleScanner.firstSelectedDate?.dateString : ""}
          onDayPress={(date: DateData) => {
            scheduleScanner.methods.increaseCompletedSteps();
            setSelectedDate(date);
          }}
          markedDates={{
            [selectedDate?.dateString || ""]: {
              selected: true,
              selectedColor: COLORS.primary
            }
          }}
          theme={{
            backgroundColor: COLORS.secondary,
            calendarBackground: COLORS.secondary,
            dayTextColor: COLORS.opposing,
            monthTextColor: COLORS.opposing,
            arrowColor: COLORS.primary,
            todayTextColor: COLORS.primary,
            selectedDayBackgroundColor: COLORS.primary,
            textDisabledColor: COLORS.secondary,
          }}
        />
      </View>
    </View>
  )
}

export default ShiftScheduleScannerDate;

