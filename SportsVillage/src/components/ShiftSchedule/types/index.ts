export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
}
export type ScheduleData = {
  scheduleStart: FirestoreTimestamp;
  scheduleEnd: FirestoreTimestamp;
  scheduleUploaded: FirestoreTimestamp;
  scheduleName: string;
  shifts: {
    name: string;
    shifts: string[];
  }[];
}

export type ScheduleInformation = {
  [date: string]: {
    [name: string]: string
  }
}
