import React from "react";
import { Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars"
import { COLORS } from "src/config";

import { styles } from "./styles";

type ShiftScheduleScannerDateProps = {
  firstDay?: boolean;
  completeStep: () => void;
  selectedDate?: DateData;
  setSelectedDate: (dateData: DateData) => void;
  firstSelectedDate?: DateData;
}


const ShiftScheduleScannerDate: React.FC<ShiftScheduleScannerDateProps> = ({ firstDay, completeStep, selectedDate, setSelectedDate, firstSelectedDate }) => {

  return (
    <View>
      <Text style={styles.title}>{firstDay ? "First day of schedule?": "Last day of schedule?"}</Text>
      <View style={styles.calendarWrapper}>
        <Calendar 
          minDate={firstSelectedDate?.dateString}
          onDayPress={(date: DateData) => {
            completeStep();
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

