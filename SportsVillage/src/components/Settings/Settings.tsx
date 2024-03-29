import React, { useEffect, useState } from "react"
import { SafeAreaView, Text, TextInput, View } from "react-native";
import useUserPreferences from "../common/hooks/useUserPreferences";

import { styles } from "./styles";

const Settings: React.FC = () => {

  const { userPreferences, updateUserPreferences } = useUserPreferences();
  useEffect(() => {
    setName(userPreferences.name);
    setScheduleOffset(userPreferences.scheduleOffset);
  }, [userPreferences])

  const [name, setName] = useState("");
  const [scheduleOffset, setScheduleOffset] = useState(0)

  return (
    <View style={styles.settings}>
      <SafeAreaView />
      <Text style={styles.header}>Settings</Text>
      <TextInput 
        style={styles.name}
        value={name}
        onChangeText={(text) => setName(text)}
        onEndEditing={() => updateUserPreferences({...userPreferences, name})}
        placeholder="Name"
      />
      <TextInput 
        style={styles.name}
        value={scheduleOffset.toString()}
        onChangeText={(text) => setScheduleOffset(parseInt(text))}
        onEndEditing={() => updateUserPreferences({...userPreferences, scheduleOffset})}
        placeholder="Schedule Offset"
        keyboardType="numeric"
      />
    </View>
  );
}

export default Settings;

