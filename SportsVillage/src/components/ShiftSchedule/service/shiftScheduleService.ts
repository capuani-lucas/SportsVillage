import { DateData } from "react-native-calendars";
import { FirestoreTimestamp, ScheduleDayInformation, ScheduleInformation, Shifts } from "../types";

export const getCurrentDateData = (): DateData => {
    const date = new Date();
    return {
      // get datestring as yyyy-mm-dd
      dateString: date.toLocaleDateString("en-CA").split('/').join('-'),
      day: date.getDate(),
      month: date.getMonth(),
      timestamp: date.getTime(),
      year: date.getFullYear()
    }
}

const getDateStringFromFirestoreTimestamp = (firestoreTimestamp: FirestoreTimestamp): string => {
  return new Date(firestoreTimestamp.seconds * 1000).toLocaleDateString("en-CA");
}

const formatShiftKeys = (shifts: Shifts) => {
  return Object.keys(shifts).reduce((acc, shiftKey) => {
    const shift = shifts[shiftKey];
    const newShiftKey = shiftKey.replace(/_/g, '.');
    acc[newShiftKey] = shift;
    return acc;
  }, {} as Shifts);
}

export const formatScheduleDayInformation = (scheduleData: ScheduleDayInformation[]): ScheduleInformation => {
  return scheduleData.reduce((acc, scheduleDayInformation) => {
    const dateString = getDateStringFromFirestoreTimestamp(scheduleDayInformation.date);
    acc[dateString] = {
      notes: scheduleDayInformation.notes,
      shifts: formatShiftKeys(scheduleDayInformation.shifts)
    }
    return acc;
  }
  , {} as ScheduleInformation);
}


