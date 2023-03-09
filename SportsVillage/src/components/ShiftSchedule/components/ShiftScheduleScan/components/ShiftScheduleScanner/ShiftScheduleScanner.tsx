
import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../../../config";
import SwapOut from "../../../../../animated/SwapOut";
import ShiftScheduleScannerDate from "./components/ShiftScheduleScannerDate";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ShiftScheduleScannerInformation from "./components/ShiftScheduleScannerInformation";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../../../Navigation/Navigation";
import { DateData } from "react-native-calendars";
import ShiftScheduleScannerImage from "./components/ShiftScheduleScannerImage";

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


const styles = StyleSheet.create({

  scannerPage: {
    backgroundColor: COLORS.background,
    flex: 1
  },

  backButton: {
    margin: 20
  },

  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: "center"
  }

})

export default ShiftScheduleScanner;