import { DateData } from "react-native-calendars";
import { ScheduleData, ScheduleInformation } from "../types";

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

const generateDatesStringsBetweenDateSeconds = (startSeconds: number, endSeconds: number): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startSeconds * 1000);
  while (currentDate <= new Date(endSeconds * 1000)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const sortScheduleData = (scheduleData: ScheduleData[]): ScheduleData[] => {
  return scheduleData.sort((a, b) => a.scheduleUploaded.seconds - b.scheduleUploaded.seconds);
}

// takes array of schedule data
// sorts it so the schedule user uploaded more recently takes precedence
// returns object with dates as keys and values of object of names with shifts as values
export const mergeSchedules = (scheduleData: ScheduleData[]): ScheduleInformation => {
  const scheduleInformation: ScheduleInformation = {};
  sortScheduleData(scheduleData).forEach((schedule) => {
    const dates = generateDatesStringsBetweenDateSeconds(schedule.scheduleStart.seconds, schedule.scheduleEnd.seconds);
    dates.forEach((date, index) => {
      schedule.shifts.forEach((shift) => {
        if (!scheduleInformation[date]) {
          scheduleInformation[date] = {};
        }
        if (shift.shifts[index]) {
          scheduleInformation[date][shift.name] = shift.shifts[index];
        } else if (scheduleInformation[date][shift.name]) { // if shift was removed from schedule, delete it
          delete scheduleInformation[date][shift.name];
        }
      });
    });
  });

  return scheduleInformation;
}
