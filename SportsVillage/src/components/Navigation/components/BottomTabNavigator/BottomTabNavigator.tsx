import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { COLORS } from "../../../../config";
import TestComponent from "../../../Test";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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
        component={TestComponent} 
        options={{tabBarIcon: ({focused}) => <FontAwesomeIcon icon={faHouse} color={getFocusedColor(focused)}/>}} 
      />
      <Tab.Screen 
        name="About" 
        component={TestComponent} 
        options={{tabBarIcon: ({focused}) => <FontAwesomeIcon icon={faBook} color={getFocusedColor(focused)}/>}} 
      />
      <Tab.Screen 
        name="Settings" 
        component={TestComponent} 
        options={{tabBarIcon: ({focused}) => <FontAwesomeIcon icon={faCog} color={getFocusedColor(focused)}/>}} 
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;