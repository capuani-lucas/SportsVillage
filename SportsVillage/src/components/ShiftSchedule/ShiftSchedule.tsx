import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftScheduleCalendar from './components/ShiftScheduleCalendar';
import ShiftScheduleQuickInfo from './components/ShiftScheduleQuickInfo';
import ShiftScheduleWorking from './components/ShiftScheduleWorking';
import { getCurrentDateData, mergeSchedules, ScheduleInformation } from './service/shiftScheduleService';

import { styles } from './styles';

export interface ScheduleData {
  scheduleStart: string;
  scheduleEnd: string;
  scheduleUploaded: string;
  shifts: {
    name: string;
    shifts: string[];
  }[];
}

const mockData: ScheduleData = {
    scheduleStart: "2023-01-01",
    scheduleEnd: "2023-01-04",
    scheduleUploaded: "2023-01-01",
    shifts: [
      {
        name: "Lucas",
        shifts: ['8-4', '', '', '8-4']
      },
      {
        name: "Joe",
        shifts: ['8-4', '', '8-4', '']
      }
    ]
};

const mockData1: ScheduleData = {
    scheduleStart: "2023-01-05",
    scheduleEnd: "2023-01-08",
    scheduleUploaded: "2023-01-01",
    shifts: [
      {
        name: "Lucas",
        shifts: ['8-4', '8-6', '', '8-4']
      },
      {
        name: "Joe",
        shifts: ['8-4', '', '8-4', '']
      }
    ]
};

const mockData2: ScheduleData = {
    scheduleStart: "2023-01-05",
    scheduleEnd: "2023-01-08",
    scheduleUploaded: "2023-01-02",
    shifts: [
      {
        name: "Lucas",
        shifts: ['', '8-7', '', '8-4']
      },
      {
        name: "Joe",
        shifts: ['8-4', '', '8-4', '']
      }
    ]
};

const ShiftSchedule: React.FC = () => {

  const [scheduleInformation, setScheduleInformation] = useState<ScheduleInformation>(mergeSchedules([mockData, mockData1, mockData2]));
  const [selectedDate, setSelectedDate] = useState<DateData>(getCurrentDateData());


  return (
    <View style={styles.shiftSchedule}>
      <SafeAreaView />
      <Text style={styles.header}>Shifts</Text>
      <ShiftScheduleQuickInfo 
          selectedDate={selectedDate} 
          scheduleInformation={scheduleInformation} 
          user={"Lucas"}
      />
      <ScrollView>
        <ShiftScheduleCalendar 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          scheduleInformation={scheduleInformation} 
          user={"Lucas"}
        />
        <ShiftScheduleWorking 
          scheduleInformation={scheduleInformation} 
          selectedDate={selectedDate} 
        />
      </ScrollView>
    </View>
  );
}

export default ShiftSchedule;