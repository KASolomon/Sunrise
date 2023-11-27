import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import axiosBase from "../config/axiosBase";
import apiEndpoints from "../config/apiEndpoints";
import { useEffect } from "react";
import useLocation from "../hooks/useLocation";
import pass from "../config/pass";
import { Button } from "@rneui/base";
import AppText from "../components/AppText";
import { SimpleLineIcons } from "@expo/vector-icons";
export default function CurrentWeatherScreen() {
  const [location, setLocation] = useState();
  const [currentDate, setCurrentDate] = useState();

  const getLocation = async () => {
    const currentLocation = await useLocation();
    setLocation(currentLocation);
  };
  const getCurrentWeather = async () => {
    const result = await axiosBase.request({
      url: apiEndpoints.currentWeather,
      data: { lat: location.latitude, lon: location.longitude, appid: pass },
    });
    console.log(result);
  };

  const getLocaleDate = () => {
    const date = new Date();
    const localeDate = date.toLocaleString(
      [],
      {
        weekday: "long",
        day: "numeric",
        year: "numeric",
        month: "long",
      }
    );
    return localeDate;
};
useEffect(() => {
    getLocation();
    const dateString = getLocaleDate();
    setCurrentDate(dateString);
    }, []);
getLocaleDate()
  return (
    <ImageBackground
      source={require("../../assets/pictures/sun.jpg")}
      className="flex-grow px-4 pb-10 pt-20"
    >
      <View
        className="my-6 p-5 flex rounded-xl justify-center "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <View className=" justify-center flex-row">
          <SimpleLineIcons
            name="location-pin"
            size={26}
            color={"white"}
            style={{ paddingRight: 6 }}
          />
          <AppText className={"text-white"}>Ayeduase</AppText>
        </View>
        <AppText className={"text-white text-center pt-4"}>
          {currentDate}
        </AppText>
      </View>
      <Button onPress={getCurrentWeather}>Get Weather</Button>
    </ImageBackground>
  );
}
