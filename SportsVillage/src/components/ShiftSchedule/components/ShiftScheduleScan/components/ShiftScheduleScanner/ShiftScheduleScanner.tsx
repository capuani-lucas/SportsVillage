
import React, { useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "src/config";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "src/components/Navigation/Navigation";
import { DateData } from "react-native-calendars";
import SwapOut from "src/components/animated/SwapOut";
import ShiftScheduleScannerDate from "./components/ShiftScheduleScannerDate";
import ShiftScheduleScannerInformation from "./components/ShiftScheduleScannerInformation";
import ShiftScheduleScannerImage from "./components/ShiftScheduleScannerImage";

import { styles } from "./styles";

const ShiftScheduleScanner: React.FC = () => {

  const [completedSteps, setCompletedSteps] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstSelectedDate, setFirstSelectedDate] = useState<DateData>();
  const [secondSelectedDate, setSecondSelectedDate] = useState<DateData>();
  const navigation = useNavigation<NavigationProps>();
  const ref = useRef<any>(null);
  
  
  const handleClick = (goBack: boolean) => {
    if (currentIndex === 0 && goBack)
      return navigation.goBack();
    setCurrentIndex(currentIndex + (goBack ? -1 : 1));
    ref.current && ref.current.animateOut(goBack);
  }

  const increaseCompletedSteps = () => {
    setCompletedSteps(completedSteps + 1);
  }

  const components = [
    <ShiftScheduleScannerInformation />,
    <ShiftScheduleScannerDate 
      firstDay 
      completeStep={increaseCompletedSteps}
      selectedDate={firstSelectedDate}
      setSelectedDate={setFirstSelectedDate}
    />,
    <ShiftScheduleScannerDate 
      completeStep={increaseCompletedSteps}
      selectedDate={secondSelectedDate}
      setSelectedDate={setSecondSelectedDate}
    />,
    <ShiftScheduleScannerImage />
  ]

  const nextDisabled = completedSteps < currentIndex + 1;

  return (
    <View style={styles.scannerPage}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={() => handleClick(true)} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} color={COLORS.opposing}/>
        </TouchableOpacity>
        <SwapOut 
          components={components}
          ref={ref}
        />
        <TouchableOpacity 
          onPress={() => handleClick(false)} 
          style={[styles.nextButton, {backgroundColor: nextDisabled ? COLORS.secondary : COLORS.primary}]}
          disabled={nextDisabled}
        >
          <Text style={{ color: nextDisabled ? COLORS.background : COLORS.opposing }}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ShiftScheduleScanner;

