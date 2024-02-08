import { Button, Switch } from "@rneui/base";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppText from "../components/AppText";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";
import { getUnitStandard, toggleUnit } from "../store/userData";

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme == "dark" ? true : false);

  const sunriseDispatch = useDispatch();
  const unit_store = useSelector(getUnitStandard);

  const handleUnitChange = (unit) => {
    sunriseDispatch(toggleUnit(unit));
  };

  return (
    <View className="pt-16 bg-sky-300 dark:bg-black flex-grow">
      <AppText className="text-center text-2xl my-4">Settings</AppText>
      <View className="bg-sky-400  p-4 dark:bg-slate-800 m-4 rounded-xl flex-row items-center">
        <AppText className="mr-8">Dark Mode</AppText>
        <Switch
          value={isDark}
          onValueChange={() => {
            setIsDark(!isDark);
            toggleColorScheme();
          }}
        />
      </View>
      <View className="bg-sky-400 p-4 dark:bg-slate-800 m-4 rounded-xl">
        <AppText className="font-bold text-xl">Unit Standard</AppText>
        <Button
          type="outline"
          containerStyle={{
            marginVertical: 20,
            borderRadius: 25,

            backgroundColor: "#00000000",
          }}
          buttonStyle={unit_store === 'imperial' ? {
            borderRadius: 25,
            borderWidth: 2,
            backgroundColor: "#00000000",
          } : { backgroundColor: "#1e3a8a", borderColor: "#1d4ed8" }}
          onPress={() => {
            handleUnitChange("metric");
          }}
        >
          <AppText className="text-base">Metric (Celsius)</AppText>
        </Button>
        <Button
          type="outline"
          containerStyle={{
            marginVertical: 20,
            borderRadius: 25,

            backgroundColor: "#00000000",
          }}
          buttonStyle={unit_store === 'metric' ? {
            borderRadius: 25,
            borderWidth: 2,
            backgroundColor: "#00000000",
          } : { backgroundColor: "#1e3a8a", borderColor: "#1d4ed8" }}
          onPress={() => {
            handleUnitChange("imperial");
          }}
        >
          <AppText className="text-base">Imperial (Farenheit)</AppText>
        </Button>
      </View>
      <View className="bg-sky-400  p-4 dark:bg-slate-800 m-4 rounded-xl">
        <AppText className="mr-8">Icon Credit</AppText>
        <TomorrowWeatherIcon
          code={"credit"}
          style={{ width: 300, height: 100, alignSelf: "center" }}
        />
      </View>
    </View>
  );
}
