import { DateData } from "react-native-calendars";
import { ScheduleData } from "../ShiftSchedule";


export interface ScheduleInformation {
  [date: string]: {
    [name: string]: string
  }
}

export const getCurrentDateData = (): DateData => {
    const date = new Date();
    return {
      dateString: date.toISOString().split('T')[0],
      day: date.getDate(),
      month: date.getMonth(),
      timestamp: date.getTime(),
      year: date.getFullYear()
    }
}

const generateDatesStringsBetweenDateStrings = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

const sortScheduleData = (scheduleData: ScheduleData[]): ScheduleData[] => {
  return scheduleData.sort((a, b) => new Date(a.scheduleUploaded).getTime() - new Date(b.scheduleUploaded).getTime());
}

// takes array of schedule data
// sorts it so the schedule user uploaded more recently takes precedence
// returns object with dates as keys and values of object of names with shifts as values
export const mergeSchedules = (scheduleData: ScheduleData[]): ScheduleInformation => {
  const scheduleInformation: ScheduleInformation = {};
  sortScheduleData(scheduleData).forEach((schedule) => {
    const dates = generateDatesStringsBetweenDateStrings(schedule.scheduleStart, schedule.scheduleEnd);
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
