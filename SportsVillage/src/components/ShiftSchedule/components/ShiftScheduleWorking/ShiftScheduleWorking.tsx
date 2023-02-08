import React from "react"
import { Text, View } from "react-native";
import { DateData } from "react-native-calendars";
import { styles } from "./styles";
import DropFadeIn from "../../../animated/DropFadeIn";
import { ScheduleInformation } from "../../types";


interface INProps {
  scheduleInformation: ScheduleInformation;
  selectedDate: DateData;
}

const ShiftScheduleWorking: React.FC<INProps> = ({ scheduleInformation, selectedDate }) => {
  const scheduleNames = Object.keys(scheduleInformation[selectedDate?.dateString]?.shifts || {});
  return (
    <View>
      {
        scheduleNames.map((name, index) => {
          const shift = scheduleInformation[selectedDate?.dateString]?.shifts[name];
          return (
            <DropFadeIn key={index} delay={0} animationDuration={300} updateOnReRender>
              <View style={styles.shift}>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>{shift}</Text>
              </View>
            </DropFadeIn>
          )
        })
      }
    </View>
  );
}


export default ShiftScheduleWorking