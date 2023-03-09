
import React from "react";
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "src/config";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import SwapOut from "src/components/animated/SwapOut";
import ShiftScheduleScannerDate from "./components/ShiftScheduleScannerDate";
import ShiftScheduleScannerInformation from "./components/ShiftScheduleScannerInformation";
import ShiftScheduleScannerImage from "./components/ShiftScheduleScannerImage";
import useScheduleScanner from "./hooks/useScheduleScanner";

import { styles } from "./styles";
import ShiftScheduleScannerName from "./components/ShiftScheduleScannerName";

const ShiftScheduleScanner: React.FC = () => {

  const {     
    completedSteps, 
    currentIndex, 
    firstSelectedDate, 
    secondSelectedDate, 
    imageData, 
    scheduleData, 
    loading, 
    userPreferences,
    error, 
    ref, 
    methods 
  } = useScheduleScanner();

  const components = [
    <ShiftScheduleScannerInformation />,
    <ShiftScheduleScannerDate 
      firstDay 
      completeStep={methods.increaseCompletedSteps}
      selectedDate={firstSelectedDate}
      setSelectedDate={methods.setFirstSelectedDate}
    />,
    <ShiftScheduleScannerDate 
      completeStep={methods.increaseCompletedSteps}
      firstSelectedDate={firstSelectedDate}
      selectedDate={secondSelectedDate}
      setSelectedDate={methods.setSecondSelectedDate}
    />,
    <ShiftScheduleScannerImage 
      completeStep={methods.increaseCompletedSteps}
      imageData={imageData}
      setImageData={methods.setImageData}
    />,
    <ShiftScheduleScannerName 
      parseSchedule={methods.parseSchedule}
      scheduleData={scheduleData}
      userPreferences={userPreferences}
      updateUserPreferences={methods.updateUserPreferences}
      error={error}
      completeStep={methods.increaseCompletedSteps}
    />,
    
  ]

  const nextDisabled = completedSteps < currentIndex + 1;
  return (
    <View style={styles.scannerPage}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={() => methods.handleClick(true)} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} color={COLORS.opposing}/>
        </TouchableOpacity>
        {error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorMessage}>An error has occurred. Please go back and try again.</Text>
          </View>
        )}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingSpinner} />
        ) : (
          <SwapOut 
            startIndex={currentIndex}
            components={components}
            ref={ref}
          />
        )}
        <TouchableOpacity 
          onPress={() => methods.handleClick(false)} 
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

