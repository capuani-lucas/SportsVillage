import { DateData } from "react-native-calendars/src/types";


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

