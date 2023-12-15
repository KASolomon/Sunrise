import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import useLocation from "./app/hooks/useLocation";
import RealtimeWeatherScreen from "./app/screens/RealtimeWeatherScreen";
import HourlyForecast from "./app/components/HourlyForecast";
import DailyForecastScreen from "./app/screens/DailyForecastScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import AppBottomTabNavigator from "./app/navigators/AppBottomTabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <View className=" flex-grow dark:bg-slate-800">

      <AppBottomTabNavigator/>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
