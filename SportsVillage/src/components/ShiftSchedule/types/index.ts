
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
  shifts: Shifts
}

export type Shifts = {
  [name: string]: string
}

export type ShiftEdit = {
  date: string;
  shift: string;
  notes: string;
}