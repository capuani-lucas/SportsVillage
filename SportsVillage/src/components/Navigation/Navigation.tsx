
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from "@react-native-firebase/auth";
import LoginComponent from "../Login";
import BottomTabNavigator from "./components/BottomTabNavigator";
import ShiftScheduleScanner from "../ShiftSchedule/components/ShiftScheduleScan/components/ShiftScheduleScanner";

export type RootStackParamList = {
  Login: undefined,
  Test: undefined,
  Home: undefined
  Scanner: undefined
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

// see https://reactnavigation.org/docs/tab-based-navigation/

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation: React.FC = () => {
  
  return (
    <NavigationContainer >
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName={auth().currentUser ? "Test" : "Login"}
      >
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Test" component={BottomTabNavigator} />
        <Stack.Screen name="Scanner" component={ShiftScheduleScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default Navigation;


