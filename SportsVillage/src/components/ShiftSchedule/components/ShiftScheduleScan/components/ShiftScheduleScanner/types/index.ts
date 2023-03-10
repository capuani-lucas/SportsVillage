import { DateData } from "react-native-calendars";
import { UserPreferences } from "src/components/common/hooks/useUserPreferences";

export type ShiftScheduleResponse = string[][]
export type ImageData = {
  name: string,
  type: string,
  uri: string
}

export type ScheduleScanner = {
  completedSteps: number;
  currentIndex: number;
  firstSelectedDate?: DateData;
  secondSelectedDate?: DateData;
  imageData: ImageData;
  scheduleData: ShiftScheduleResponse;
  userPreferences: UserPreferences;
  loading: boolean;
  error: any;
  ref: any;
  methods: {
    setCompletedSteps: (value: number) => void;
    setCurrentIndex: (value: number) => void;
    setFirstSelectedDate: (value: DateData) => void;
    setSecondSelectedDate: (value: DateData) => void;
    setImageData: (value: ImageData) => void;
    handleClick: (goBack: boolean) => void;
    increaseCompletedSteps: () => void;
    fetchUserPreferences: () => void;
    updateUserPreferences: (value: UserPreferences) => void;
    parseSchedule: () => void;
    setScheduleData: (value: ShiftScheduleResponse) => void;
  }
}

