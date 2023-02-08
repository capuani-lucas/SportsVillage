
export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
}

export type ScheduleInformation = {
  [date: string]: {
    notes: string;
    shifts: {
      [name: string]: string
    }
  }
}

export type ScheduleDayInformation = {
  date: FirestoreTimestamp;
  notes: string;
  shifts: {
    [name: string]: string
  }
}