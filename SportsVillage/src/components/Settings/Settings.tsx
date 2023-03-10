import React, { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { COLORS } from "src/config";
import useUserPreferences from "../common/hooks/useUserPreferences";

const Settings: React.FC = () => {

  const { userPreferences, updateUserPreferences } = useUserPreferences();
  useEffect(() => {
    setName(userPreferences.name);
  }, [userPreferences])

  const [name, setName] = useState("");

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
    </View>
  );
}

const styles = StyleSheet.create({
  settings: {
    backgroundColor: COLORS.background,
    flex: 1
  },

  header: {
    fontWeight: "bold",
    fontSize: 34,
    color: COLORS.opposing,
    margin: 20
  },

  name: {
    backgroundColor: COLORS.secondary,
    color: COLORS.opposing,
    padding: 20,
    margin: 10
  }
});


export default Settings;

