import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import routes from "../config/routes";
import RealtimeWeatherScreen from "../screens/RealtimeWeatherScreen";
import DailyForecastScreen from "../screens/DailyForecastScreen";

export default function HomeStackNavigator() {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={routes.realtimeWeather}
      screenOptions={{ headerShown: false }}
      
    >
      <HomeStack.Screen name={routes.realtimeWeather} component={RealtimeWeatherScreen} />
      <HomeStack.Screen
        name={routes.dailyForecast}
        options={{ title: "Daily Forecast", headerShown: "true" }}
        component={DailyForecastScreen}
      />
    </HomeStack.Navigator>
  );
}
