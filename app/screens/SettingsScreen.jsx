import { View, Text } from "react-native";
import React, { useState } from "react";
import AppText from "../components/AppText";
import { Button, Switch } from "@rneui/base";
import { useColorScheme } from "nativewind";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";

export default function SettingsScreen() {
  const [unitDisabled, setUnitDisabled] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme == "dark" ? true : false);
  return (
    <View className="pt-16 bg-sky-300 dark:bg-black flex-grow">
      <AppText className="text-center text-2xl my-4"> Settings</AppText>
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
          disabled={unitDisabled}
          disabledStyle={{ backgroundColor: "#1e3a8a", borderColor: "#1d4ed8" }}
          containerStyle={{
            marginVertical: 20,
            borderRadius: 25,

            backgroundColor: "#00000000",
          }}
          buttonStyle={{ borderRadius: 25, borderWidth: 2 }}
          onPress={() => {
            setUnitDisabled(!unitDisabled);
          }}
        >
          <AppText className="text-base">Metric (Celsius)</AppText>
        </Button>
        <Button
          type="outline"
          disabled={!unitDisabled}
          disabledStyle={{ backgroundColor: "#1e3a8a", borderColor: "#1d4ed8" }}
          containerStyle={{
            marginVertical: 20,
            borderRadius: 25,

            backgroundColor: "#00000000",
          }}
          buttonStyle={{ borderRadius: 25, borderWidth: 2 }}
          onPress={() => {
            setUnitDisabled(!unitDisabled);
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
