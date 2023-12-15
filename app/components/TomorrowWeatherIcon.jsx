import { Image } from "expo-image";
import React from "react";
import { weatherCode } from "../config/weatherCodes";
import { useColorScheme } from 'nativewind';

export default function TomorrowWeatherIcon({ code, style = {} }) {
  const getIconSource = (code) => {
    const {colorScheme} = useColorScheme();
    switch (code) {
      case "sunrise":
        return colorScheme == "dark"
          ? weatherCode["sunrise_dark"].iconSource
          : weatherCode["sunrise_light"].iconSource;
      case "sunset":
        return colorScheme == "dark"
          ? weatherCode["sunset_dark"].iconSource
          : weatherCode["sunset_light"].iconSource;
      case "credit":
        return colorScheme == "dark"
          ? weatherCode["credit_dark"].iconSource
          : weatherCode["credit_light"].iconSource;
      default:
        return weatherCode[code].iconSource;
    }
  };

  return (
      <Image
        source={getIconSource(code)}
        style={[ style]}
        alt="Weather Icon"
        contentFit="contain"
        transition={{ duration: 1000, timing: "ease-in-out" }}
      />
  );
}
