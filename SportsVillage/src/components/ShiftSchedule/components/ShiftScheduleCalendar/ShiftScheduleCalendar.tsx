import React from "react";
import { Calendar } from "react-native-calendars";
import { DateData } from "react-native-calendars/src/types";
import { COLORS } from "../../../../config";
import { ScheduleInformation, ShiftEdit } from "../../types";
import { getMarkedDates } from "./service";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
interface INProps {
  selectedDate: DateData;
  setSelectedDate: (dateData: DateData) => void;
  user: string;
  scheduleInformation: ScheduleInformation;
  setEditing: (editing: ShiftEdit) => void;
}


const ShiftScheduleCalendar: React.FC<INProps> = ({ selectedDate, setSelectedDate, user, scheduleInformation, setEditing }) => {
  return (
    <Calendar
      onDayPress={(dateData) => setSelectedDate(dateData)}
      onDayLongPress={(dateData) => {
        ReactNativeHapticFeedback.trigger("impactMedium");
        setEditing(
          {
            date: dateData.dateString,
            shift: scheduleInformation[dateData.dateString]?.shifts[user],
            notes: scheduleInformation[dateData.dateString]?.notes
          }
        )
      }}
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