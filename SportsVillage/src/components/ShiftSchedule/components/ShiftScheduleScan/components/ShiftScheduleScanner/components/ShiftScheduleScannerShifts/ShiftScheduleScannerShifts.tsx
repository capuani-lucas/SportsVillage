import React from "react"
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, TextInput, View } from "react-native"
import { generateDateStringsBetweenDates } from "src/components/common/service/date";
import { ScheduleScanner } from "../../types";

import { styles } from "./styles";

type ShiftScheduleScannerShiftsProps = {
  scheduleScanner: ScheduleScanner;
}

const ShiftScheduleScannerShifts: React.FC<ShiftScheduleScannerShiftsProps> = ({ scheduleScanner }) => {

  const shifts = scheduleScanner.scheduleData.find(row => row[0].trim() === scheduleScanner.userPreferences.name.trim());
  const handleTextInput = (text: string, index: number) => {
    const newScheduleData = scheduleScanner.scheduleData.map(row => {
      if (row[0].trim() === scheduleScanner.userPreferences.name.trim()) {
        row[index+1] = text;
      }
      return row;
    })
    scheduleScanner.methods.setScheduleData(newScheduleData);
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const paddingToBottom = 10;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    const yOffset = event.nativeEvent.contentOffset.y;
    if (layoutHeight + yOffset >= contentHeight - paddingToBottom) {
      scheduleScanner.methods.increaseCompletedSteps();
    }
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Double check your shifts:</Text>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={400}>
        {generateDateStringsBetweenDates(
          scheduleScanner.firstSelectedDate?.dateString, 
          scheduleScanner.secondSelectedDate?.dateString
        )
        .map((date, index) => {
          return (
            <View style={styles.dateContainer} key={date} >
              <Text style={styles.dateText}>{date}</Text>
              <TextInput 
                value={shifts ? shifts[index+1] : ""}
                placeholder="Shift"
                style={styles.dateInput}
                onChangeText={(text) => handleTextInput(text, index)}
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ShiftScheduleScannerShifts;

