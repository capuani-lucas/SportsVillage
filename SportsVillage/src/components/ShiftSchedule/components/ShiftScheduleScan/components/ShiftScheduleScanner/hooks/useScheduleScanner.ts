import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import useUserPreferences from "src/components/common/hooks/useUserPreferences";
import { NavigationProps } from "src/components/Navigation/Navigation";
import { ImageData, ScheduleScanner } from "../types";
import useBulkUpdateShifts from "./useBulkUpdateShifts";
import useFetchScheduleData from "./useFetchScheduleData";


const useScheduleScanner = (): ScheduleScanner => {

  const [completedSteps, setCompletedSteps] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState<DateData>();
  const [secondSelectedDate, setSecondSelectedDate] = useState<DateData>();
  const [imageData, setImageData] = useState<ImageData>({uri: '', type: '', name: ''});

  const navigation = useNavigation<NavigationProps>();
  const ref = useRef<any>(null);

  const { 
    fetchScheduleData, 
    scheduleData, 
    loading: scheduleLoading, 
    error: scheduleError,
    setScheduleData
  } = useFetchScheduleData();

  const { 
    fetchUserPreferences, 
    userPreferences, 
    updateUserPreferences,
    loading: preferencesLoading, 
    error: preferencesError 
  } = useUserPreferences();

  const { 
    bulkUpdateShifts, 
    loading: 
    bulkUpdateLoading, 
    error: bulkUpdateError 
  } = useBulkUpdateShifts();

  const loading = scheduleLoading || preferencesLoading || bulkUpdateLoading;
  const error = scheduleError || preferencesError || bulkUpdateError;

  const handleClick = (goBack: boolean) => {

    // No going back after parsing schedule
    if (currentIndex >= 4 && goBack) {
      return navigation.goBack();
    }

    if (currentIndex === 0 && goBack || (scheduleError || preferencesError) && goBack)
      return navigation.goBack();

    // 6 components in the scanner
    if (currentIndex === 6 - 1) {
      bulkUpdateShifts(
        firstSelectedDate!, 
        secondSelectedDate!, 
        scheduleData, 
        userPreferences.scheduleOffset
      ).then(() => navigation.goBack());
      return;
    }
    
    setCurrentIndex(currentIndex + (goBack ? -1 : 1));
    ref.current && ref.current.animateOut(goBack);
  }

  const increaseCompletedSteps = () => {
    setCompletedSteps(completedSteps + 1);
  }

  const parseSchedule = () => fetchScheduleData(imageData);

  const methods = {
    setCompletedSteps,
    setCurrentIndex,
    setFirstSelectedDate,
    setSecondSelectedDate,
    setImageData,
    handleClick,
    increaseCompletedSteps,
    fetchUserPreferences,
    updateUserPreferences,
    parseSchedule,
    setScheduleData
  }

  return { 
    completedSteps, 
    currentIndex, 
    firstSelectedDate, 
    secondSelectedDate, 
    imageData, 
    scheduleData, 
    userPreferences,
    loading, 
    error,
    ref, 
    methods 
  };

}

export default useScheduleScanner;

