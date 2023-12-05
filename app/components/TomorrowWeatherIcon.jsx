import { Image } from "expo-image";
import React from "react";
import { View, useColorScheme } from "react-native";
import { weatherCode } from "../config/weatherCodes";

export default function TomorrowWeatherIcon({ code, style = {} }) {
  const getIconSource = (code) => {
    const colorScheme = useColorScheme();
    switch (code) {
      case "sunrise":
        return colorScheme == "dark"
          ? weatherCode["sunrise_dark"].iconSource
          : weatherCode["sunrise_light"].iconSource;
      case "sunset":
        return colorScheme == "dark"
          ? weatherCode["sunset_dark"].iconSource
          : weatherCode["sunset_light"].iconSource;
      default:
        return weatherCode[code].iconSource;
    }
  };

  return (
      <Image
        source={getIconSource(code)}
        style={[ style]}
        alt="Weather Icon"
        transition={{ duration: 1000, timing: "ease-in-out" }}
      />
  );
}
