import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DateData } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftScheduleCalendar from './components/ShiftScheduleCalendar';
import ShiftScheduleEdit from './components/ShiftScheduleEdit';
import ShiftScheduleQuickInfo from './components/ShiftScheduleQuickInfo';
import ShiftScheduleScan from './components/ShiftScheduleScan';
import ShiftScheduleWorking from './components/ShiftScheduleWorking';
import { useScheduleInformation } from './hooks/useScheduleInformation';
import { getCurrentDateData } from './service/shiftScheduleService';

import { styles } from './styles';
import { ShiftEdit } from './types';


const ShiftSchedule: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState<DateData>(getCurrentDateData());
  const { scheduleInformation, loading } = useScheduleInformation();
  const [editing, setEditing] = useState<ShiftEdit>();

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
          setEditing={setEditing}
        />
        <ShiftScheduleWorking 
          scheduleInformation={scheduleInformation} 
          selectedDate={selectedDate} 
        />
      </ScrollView>
      <ShiftScheduleScan />
      <ShiftScheduleEdit 
        editing={editing} 
        setEditing={setEditing}
        user={"Lucas"}
      />
    </View>
  );
}

export default ShiftSchedule;

