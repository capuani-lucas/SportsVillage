import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ShiftScheduleCalendar from './components/ShiftScheduleCalendar';

import { styles } from './styles';

const ShiftSchedule: React.FC = () => {
  return (
    <View style={styles.test}>
      <SafeAreaView />
      <ShiftScheduleCalendar />
    </View>
  );
}

export default ShiftSchedule;