import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import routes from "../config/routes";
import RealtimeWeatherScreen from "../screens/RealtimeWeatherScreen";
import DailyForecastScreen from "../screens/DailyForecastScreen";

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
