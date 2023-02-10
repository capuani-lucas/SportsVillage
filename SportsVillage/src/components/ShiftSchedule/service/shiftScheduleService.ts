import { DateData } from "react-native-calendars";
import { FirestoreTimestamp, ScheduleDayInformation, ScheduleInformation } from "../types";

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

export const formatScheduleDayInformation = (scheduleData: ScheduleDayInformation[]): ScheduleInformation => {
  return scheduleData.reduce((acc, scheduleDayInformation) => {
    const dateString = getDateStringFromFirestoreTimestamp(scheduleDayInformation.date);
    acc[dateString] = {
      notes: scheduleDayInformation.notes,
      shifts: scheduleDayInformation.shifts
    }
    return acc;
  }
  , {} as ScheduleInformation);
}

export const createDateAtMidnight = (date: string) => {
    const dateArray = date.split("-");
    return new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
}
