import React from "react";
import { View } from "react-native";
import AppText from "./AppText";
import TempText from "./TempText";
import TomorrowWeatherIcon from "./TomorrowWeatherIcon";

export default function HourlyForecast({
  dateTime,
  temperature,
  weatherCode,
}) {
  const roundedT = Math.floor(temperature);
  const time = new Date(dateTime).toLocaleTimeString([], {
    hour12 : true,
    hour:'numeric'
    
  })
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
