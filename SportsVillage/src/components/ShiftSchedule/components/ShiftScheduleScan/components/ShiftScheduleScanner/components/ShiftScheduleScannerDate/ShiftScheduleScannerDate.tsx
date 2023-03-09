import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars"
import { COLORS } from "../../../../../../../../config";

type ShiftScheduleScannerDateProps = {
  firstDay?: boolean;
  completeStep: () => void;
  selectedDate?: DateData;
  setSelectedDate: (dateData: DateData) => void;
}


const ShiftScheduleScannerDate: React.FC<ShiftScheduleScannerDateProps> = ({ firstDay, completeStep, selectedDate, setSelectedDate }) => {

  return (
    <View>
      <Text style={styles.title}>{firstDay ? "First day of schedule?": "Last day of schedule?"}</Text>
      <View style={styles.calendarWrapper}>
        <Calendar 
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
            selectedDayBackgroundColor: COLORS.primary
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  title: {
    color: COLORS.opposing,
    fontSize: 24,
    fontWeight: "bold",
    margin: 20
  },

  calendarWrapper: {
    backgroundColor: COLORS.secondary,
    margin: 14,
    borderRadius: 10,
    padding: 10
  }
})

export default ShiftScheduleScannerDate;