import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { COLORS } from "../../../../../config";
import { ScheduleInformation } from "../../../types";


export const getMarkedDates = (selectedDate: DateData, scheduleInformation: ScheduleInformation, user: string): MarkedDates => {
  const markedShifts = getUserMarkedShifts(scheduleInformation, user);
  return {
    ...markedShifts,
    [selectedDate.dateString]: { 
      ...{
        ...markedShifts[selectedDate.dateString],
        selected: true
      }
    }
  }
}

export const getUserMarkedShifts = (scheduleInformation: ScheduleInformation, user: string) => {
  return Object.entries(scheduleInformation).reduce((acc: any, [date, { shifts }]) => {
    return {
      ...acc,
      ...(shifts[user] && { 
        [date]: { marked: true, dotColor: COLORS.primary } 
      })
    };
  }
  , {})
}

