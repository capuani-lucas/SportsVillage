import React, { useState } from "react"
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserPreferences } from "src/components/common/hooks/useUserPreferences";
import { ShiftScheduleResponse } from "../../types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "src/config";

type ShiftScheduleScannerNameProps = {
  parseSchedule(): void;
  scheduleData: ShiftScheduleResponse;
  userPreferences: UserPreferences;
  error: boolean;
  updateUserPreferences: (userPreferences: UserPreferences) => void;
  completeStep: () => void;
}

const ShiftScheduleScannerName: React.FC<ShiftScheduleScannerNameProps> = (
  { parseSchedule, scheduleData, userPreferences, error, updateUserPreferences, completeStep }
  ) => {

  const names = scheduleData
                  .slice(userPreferences.scheduleOffset, scheduleData.length)
                  .map(row => row[0]);

  useEffect(() => {
    // We want to parse the schedule as soon as the component is mounted
    !scheduleData.length && !error && parseSchedule();
    names.length && userPreferences.name && completeStep();
  }, []);

  const handlePress = (name: string) => {
    updateUserPreferences({ ...userPreferences, name });
    completeStep();
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Choose your name on the schedule:</Text>
      <ScrollView>
        {names.length ? (
          names.map(name => (
          <TouchableOpacity 
            style={[styles.nameContainer, {borderColor: userPreferences.name.trim() === name.trim() ? COLORS.primary : "transparent"}]} 
            onPress={() => handlePress(name)}
            key={name}
          >
            <Text style={styles.nameText}>{name}</Text>
            {userPreferences.name.trim() === name.trim() && <FontAwesomeIcon icon={faCheck} color={COLORS.primary} />}
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

