
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
import ShiftScheduleScannerShifts from "./components/ShiftScheduleScannerShifts";

const ShiftScheduleScanner: React.FC = () => {

  const scheduleScanner = useScheduleScanner();

  const components = [
    <ShiftScheduleScannerInformation />,
    <ShiftScheduleScannerDate scheduleScanner={scheduleScanner} firstDay />,
    <ShiftScheduleScannerDate scheduleScanner={scheduleScanner} />,
    <ShiftScheduleScannerImage scheduleScanner={scheduleScanner} />,
    <ShiftScheduleScannerName scheduleScanner={scheduleScanner} />,
    <ShiftScheduleScannerShifts scheduleScanner={scheduleScanner} />
  ]

  const nextDisabled = scheduleScanner.completedSteps < scheduleScanner.currentIndex + 1;
  return (
    <View style={styles.scannerPage}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={() => scheduleScanner.methods.handleClick(true)} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} color={COLORS.opposing}/>
        </TouchableOpacity>
        {scheduleScanner.error && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorMessage}>An error has occurred. Please go back and try again.</Text>
          </View>
        )}
        {scheduleScanner.loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingSpinner} />
        ) : (
          <SwapOut 
            startIndex={scheduleScanner.currentIndex}
            components={components}
            ref={scheduleScanner.ref}
          />
        )}
        <TouchableOpacity 
          onPress={() => scheduleScanner.methods.handleClick(false)} 
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

