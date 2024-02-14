import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import routes from "../config/routes";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

export default function AppBottomTabNavigator() {
  const AppBottomTab = createBottomTabNavigator();

const  { colors} = useTheme()

  return (
    <AppBottomTab.Navigator
    initialRouteName={routes.homeStackNav}
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle :{ height : 70},
        tabBarLabelStyle :{ marginBottom : 15, fontSize : 15,},
      
      }}
    >
      <AppBottomTab.Screen
        name={routes.homeStackNav}
        options={{
          title: "Weather",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="cloud-outline" color={color} size={30} />
          ),
          headerShown : false
        }}
        component={HomeStackNavigator}
      />
      <AppBottomTab.Screen
        name={routes.settingsStackNav}
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused, size }) => (
            <Ionicons name="settings-outline" color={color} size={30} />
          ),
          headerShown : false
        }}
        component={SettingsStackNavigator}
      />
    </AppBottomTab.Navigator>
  );
}
