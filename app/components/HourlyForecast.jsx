import { View, Text } from "react-native";
import React from "react";
import AppText from "./AppText";
import TomorrowWeatherIcon from "./TomorrowWeatherIcon";
import TempText from "./TempText";
import { getCommonTime } from "../config/utils";

export default function HourlyForecast({
  dateTime,
  temperature,
  weatherCode,
}) {
  const roundedT = Math.floor(temperature);
  const time = getCommonTime(dateTime);
  return (
    <View className="bg-sky-400 dark:bg-slate-800 m-3 items-center py-6 px-5 rounded-3xl w-24">
      <AppText className="font-bold">{time}</AppText>
      <TomorrowWeatherIcon
        code={weatherCode}
        style={{ width: 40, height: 40, marginVertical: 10 }}
      />
      <TempText className="text-2xl">{roundedT}</TempText>
    </View>
  );
}
