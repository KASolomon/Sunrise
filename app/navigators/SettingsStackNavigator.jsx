import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import routes from "../config/routes";
import SettingsScreen from "../screens/SettingsScreen";
import WebviewScreen from "../screens/WebviewScreen";

export default function SettingsStackNavigator() {
  const SettingsStack = createStackNavigator();
  return (
    <SettingsStack.Navigator initialRouteName={routes.settings}>
      <SettingsStack.Screen
        name={routes.settings}
        options={{ title: "Settings", headerShown: false }}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name={routes.tomorrowIO}
        options={{ title: "Tomorrow.io", headerShown: false,  }}
        component={WebviewScreen}
      />
    </SettingsStack.Navigator>
  );
}
