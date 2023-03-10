import React from "react"
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ScheduleScanner } from "../../types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "src/config";
import { styles } from "./styles";

type ShiftScheduleScannerNameProps = {
  scheduleScanner: ScheduleScanner;
}

const ShiftScheduleScannerName: React.FC<ShiftScheduleScannerNameProps> = ({ scheduleScanner }) => {

  const names = scheduleScanner.scheduleData
                  .slice(scheduleScanner.userPreferences.scheduleOffset, scheduleScanner.scheduleData.length)
                  .map(row => row[0]);

  useEffect(() => {
    // We want to parse the schedule as soon as the component is mounted
    !scheduleScanner.scheduleData.length && !scheduleScanner.error && scheduleScanner.methods.parseSchedule();
    names.length && scheduleScanner.userPreferences.name && scheduleScanner.methods.increaseCompletedSteps();
  }, []);

  const handlePress = (name: string) => {
    scheduleScanner.methods.updateUserPreferences({ ...scheduleScanner.userPreferences, name });
    scheduleScanner.methods.increaseCompletedSteps();
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Choose your name on the schedule:</Text>
      <ScrollView>
        {names.length ? (
          names.map(name => (
          <TouchableOpacity 
            style={[
              styles.nameContainer, 
              {borderColor: scheduleScanner.userPreferences.name === name.trim() ? COLORS.primary : "transparent"}
            ]} 
            onPress={() => handlePress(name)}
            key={name}
          >
            <Text style={styles.nameText}>{name}</Text>
            {scheduleScanner.userPreferences.name === name.trim() && <FontAwesomeIcon icon={faCheck} color={COLORS.primary} />}
          </TouchableOpacity>
        ))
        ) : (
          <Text style={{color: COLORS.opposing, textAlign: "center", marginTop: 20}}>No names found</Text>
        )}
      </ScrollView>
    </View>
  );
}


export default ShiftScheduleScannerName;

