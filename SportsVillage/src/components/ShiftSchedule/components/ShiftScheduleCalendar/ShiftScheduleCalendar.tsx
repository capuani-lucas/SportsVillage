import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { COLORS } from "../../../../config";
import { getCurrentDateData } from "./service";

const ShiftScheduleCalendar: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState<DateData>(getCurrentDateData());
  const getMarkedDates = (): MarkedDates => {
    return {
      [selectedDate?.dateString]: {
        selected: true,
        marked: true
      }
    }
  }

  return (
    <Calendar
      onDayPress={(d) => setSelectedDate(d)}
      markedDates={getMarkedDates()}  
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
  );
}

export default ShiftScheduleCalendar;