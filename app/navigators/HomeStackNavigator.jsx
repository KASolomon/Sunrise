import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import routes from "../config/routes";
import DailyForecastScreen from "../screens/DailyForecastScreen";
import RealtimeWeatherScreen from "../screens/RealtimeWeatherScreen";

export default function HomeStackNavigator() {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={routes.realtimeWeather}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HomeStack.Screen
        name={routes.realtimeWeather}
        component={RealtimeWeatherScreen}
        options={{ animationTypeForReplace: "pop" }}
      />
      <HomeStack.Screen
        name={routes.dailyForecast}
        component={DailyForecastScreen}
      />
    </HomeStack.Navigator>
  );
}
