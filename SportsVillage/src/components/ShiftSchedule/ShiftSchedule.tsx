import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './styles';

const ShiftSchedule: React.FC = () => {
  return (
    <View style={styles.test}>
      <SafeAreaView />
      <Text style={styles.test1}>Test</Text>
    </View>
  );
}

export default ShiftSchedule;