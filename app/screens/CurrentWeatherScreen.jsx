import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import axiosBase from "../config/axiosBase";
import apiEndpoints from "../config/apiEndpoints";
import { useEffect } from "react";
import useLocation from "../hooks/useLocation";
import pass from "../config/pass";
import { Button } from "@rneui/base";
import AppText from "../components/AppText";
import TempText from "../components/TempText";
import {
  Ionicons,
  SimpleLineIcons,
  Entypo,
  Fontisto,
  Feather,
} from "@expo/vector-icons";

export default function CurrentWeatherScreen() {
  const [location, setLocation] = useState();
  const [currentDate, setCurrentDate] = useState();

  const UVI = "Low";
  const iconColor = "rgba(0,0,0,0.7)";
  const windSpeed = "23 km/h";
  const dark = true;
  const feelTemp = 10;
  const humidity = "22%";
  const precipitation = "95%";
  const BACK_IMG = dark
    ? "../../assets/pictures/dark.jpeg"
    : "../../assets/pictures/sun.jpg";

  const viewBackground = "rgba(0, 0, 0, 0.2)";
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
    const localeDate = date.toLocaleString([], {
      weekday: "long",
      day: "numeric",
      year: "numeric",
      month: "long",
    });
    return localeDate;
  };
  useEffect(() => {
    getLocation();
    const dateString = getLocaleDate();
    setCurrentDate(dateString);
  }, []);
  getLocaleDate();
  return (
    <ImageBackground
      source={require(`${BACK_IMG}`)}
      className="flex-grow px-4 pb-10 pt-20"
    >
      <View
        className="my-6 p-5 flex rounded-xl justify-center "
        style={{ backgroundColor: viewBackground }}
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

      <View className="justify-center">
        <View className="flex-row  justify-center">
          <TempText className="text-center">13</TempText>
          <AppText className="pl-1 text-base" style={{ alignSelf: "center" }}>
            Feels Like {feelTemp}°
          </AppText>
        </View>
        <View className="flex-row justify-center center-3">
          <Ionicons
            name="rainy-sharp"
            size={45}
            style={{
              color: "rgba(200,255,255,0.4)",
              borderColor: "rgba(0,123,255,0.9)",
            }}
          />
          <AppText className={"text-xl"} style={{ alignSelf: "center" }}>
            Rains
          </AppText>
        </View>
      </View>
      <View
        className=" rounded-xl p-4 my-6"
        style={{ backgroundColor: viewBackground }}
      >
        <View className="flex-row justify-between">
          <View className="flex-row w-1/2">
            <Entypo name="drop" size={45} color={iconColor} />
            <AppText className="p-2" style={{ alignSelf: "center" }}>
              {humidity}
            </AppText>
          </View>

          <View className="flex-row w-1/2">
            <Fontisto name="wind" size={45} color={iconColor} className="p-2" />
            <AppText className="p-2" style={{ alignSelf: "center" }}>
              {windSpeed}
            </AppText>
          </View>
        </View>
        <View className="flex-row mt-5 ">
          <View className="flex-row w-1/2">
            <Feather name="cloud-drizzle" size={45} color={iconColor} />
            <AppText className="p-2" style={{ alignSelf: "center" }}>
              {precipitation}
            </AppText>
          </View>
          <View className="flex-row w-1/2">
            <Ionicons name="sunny-sharp" size={45} />
            <AppText className="p-2" style={{ alignSelf: "center" }}>
              {UVI}
            </AppText>
          </View>
        </View>
      </View>

      {/* <Button onPress={getCurrentWeather}>Get Weather</Button> */}
    </ImageBackground>
  );
}
