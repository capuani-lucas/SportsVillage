
import React from "react";
import { View, Text, Button, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../Navigation/Navigation";

const Test: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  const test = () => {
    auth().signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }]
    })
  }

  return (
    <View style={{backgroundColor: "black", flex: 1}}>
      <SafeAreaView />
      <Button title="Logout" onPress={test} />
    </View>
  );
};

export default Test;