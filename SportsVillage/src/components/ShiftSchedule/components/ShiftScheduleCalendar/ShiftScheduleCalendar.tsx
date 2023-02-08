import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { COLORS } from "../../../../config";
import { ScheduleInformation } from "../../types";
import { getMarkedDates } from "./service";

interface INProps {
  selectedDate: DateData;
  setSelectedDate: (dateData: DateData) => void;
  user: string;
  scheduleInformation: ScheduleInformation;
}


const ShiftScheduleCalendar: React.FC<INProps> = ({ selectedDate, setSelectedDate, user, scheduleInformation }) => {

  return (
    <Calendar
      onDayPress={(dateData) => setSelectedDate(dateData)}
      markedDates={getMarkedDates(selectedDate, scheduleInformation, user)}  
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