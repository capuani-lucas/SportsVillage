
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth from "@react-native-firebase/auth";
import LoginComponent from "../Login";
import TestComponent from "../Test";

export type RootStackParamList = {
  Login: undefined,
  Test: undefined
}

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation: React.FC = () => {
  
  return (
    <NavigationContainer >
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName={auth().currentUser ? "Test" : "Login"}
      >
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="Test" component={TestComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default Navigation;