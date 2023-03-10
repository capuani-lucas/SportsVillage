import React, { useState } from "react"
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserPreferences } from "src/components/common/hooks/useUserPreferences";
import { ScheduleScanner, ShiftScheduleResponse } from "../../types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "src/config";

type ShiftScheduleScannerNameProps = {
  scheduleScanner: ScheduleScanner;
}

const ShiftScheduleScannerName: React.FC<ShiftScheduleScannerNameProps> = (
  { scheduleScanner }
  ) => {

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
            style={[styles.nameContainer, {borderColor: scheduleScanner.userPreferences.name.trim() === name.trim() ? COLORS.primary : "transparent"}]} 
            onPress={() => handlePress(name)}
            key={name}
          >
            <Text style={styles.nameText}>{name}</Text>
            {scheduleScanner.userPreferences.name.trim() === name.trim() && <FontAwesomeIcon icon={faCheck} color={COLORS.primary} />}
          </TouchableOpacity>
        ))
        ) : (
          <Text style={{color: COLORS.opposing, textAlign: "center", marginTop: 20}}>No names found</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    color: COLORS.opposing,
    fontSize: 20,
    fontWeight: "bold",
    margin: 15
  },

  nameContainer: {
    flexDirection: "row",
    padding: 12,
    margin: 6,
    backgroundColor: COLORS.secondary,
    justifyContent: "space-between",
    borderWidth: 1
  },

  nameText: {
    color: "white",
    fontWeight: "bold"
  }

});

export default ShiftScheduleScannerName;

