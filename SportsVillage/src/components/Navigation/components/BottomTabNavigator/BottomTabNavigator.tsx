import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { COLORS } from "../../../../config";
import TestComponent from "../../../Test";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ShiftSchedule from "../../../ShiftSchedule";
import Settings from "src/components/Settings";

const Tab = createBottomTabNavigator();
const BottomTabNavigator: React.FC = () => {

  const getFocusedColor = (focused: boolean): string => {
    return focused ? "white" : "grey";
  }

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopColor: COLORS.secondary,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ShiftSchedule} 
        options={{tabBarIcon: ({focused}) => <FontAwesomeIcon icon={faHouse} color={getFocusedColor(focused)}/>}} 
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{tabBarIcon: ({focused}) => <FontAwesomeIcon icon={faCog} color={getFocusedColor(focused)}/>}} 
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;