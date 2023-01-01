
import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";

const Test: React.FC = () => {

  return (
    <View>
      <SafeAreaView />
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
};

export default Test;