import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateData } from "react-native-calendars";
import useUserPreferences from "src/components/common/hooks/useUserPreferences";
import { NavigationProps } from "src/components/Navigation/Navigation";
import { ImageData } from "../types";
import useFetchScheduleData from "./useFetchScheduleData";

const useScheduleScanner = () => {

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
    error: scheduleError 
  } = useFetchScheduleData();

  const { 
    fetchUserPreferences, 
    userPreferences, 
    updateUserPreferences,
    loading: preferencesLoading, 
    error: preferencesError 
  } = useUserPreferences();
  
  useEffect(() => {
    fetchUserPreferences();
  }, [])

  const handleClick = (goBack: boolean) => {

    // No going back after parsing schedule
    if (currentIndex >= 4 && goBack) {
      return navigation.goBack();
    }

    if (currentIndex === 0 && goBack || (scheduleError || preferencesError) && goBack)
      return navigation.goBack();
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
    parseSchedule
  }

  return { 
    completedSteps, 
    currentIndex, 
    firstSelectedDate, 
    secondSelectedDate, 
    imageData, 
    scheduleData, 
    userPreferences,
    loading: scheduleLoading || preferencesLoading, 
    error: scheduleError || preferencesError,
    ref, 
    methods 
  };

}

export default useScheduleScanner;

