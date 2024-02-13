import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, ScrollView, View } from "react-native";
import AppText from "../components/AppText";
import TempText from "../components/TempText";

import { useDispatch, useSelector } from "react-redux";
import HourlyForecast from "../components/HourlyForecast";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";
import routes from "../config/routes";
import { getUVIDescription } from "../config/utils";
import { weatherCode } from "../config/weatherCodes";
import {
  fetchRealtimeWeather,
  getRealtimeWeather
} from "../store/realtime";
import {
  fetchTimeSpacedWeather,
  getHourlyForecast
} from "../store/timeSpacedWeather";
import {
  fetchUserCity,
  getUnitStandard,
  getUserCity,
  readUserLocation
} from "../store/userData";

import * as Localization from "expo-localization";

export default function RealtimeWeatherScreen({ navigation }) {
  const storeDispatch = useDispatch();
  const is24 = Localization.useCalendars()[0].uses24hourClock;

  //Select data from Redux store
  const unitStandard = useSelector(getUnitStandard);
  const realtimeValues = useSelector(getRealtimeWeather);
  const city = useSelector(getUserCity);
  const hourlyForecast = useSelector(getHourlyForecast);

  const [refreshing, setRefreshing] = useState(false);

  const weatherErrorMsg = "🤔 That's strange.\n\nPlease pull to refresh.";
  // Weather constants
  let UVI,
    windSpeed,
    temp,
    humidity,
    visibility,
    pptProb,
    feelTemp,
    realtimeWeatherCode,
    time, currentDate;

  //functions
  const getWeatherDescription = (code) => {
    const weatherDesc = weatherCode[code]?.description;
    return weatherDesc;
  };

  const handleDailyForecast = () => {
    navigation.navigate(routes.dailyForecast);
  };


  const startFxns = async () => {
    const location = await readUserLocation(storeDispatch);
    //Fetch the data
    fetchUserCity(storeDispatch, location);
    fetchRealtimeWeather(storeDispatch, location, unitStandard);
    fetchTimeSpacedWeather(storeDispatch, location, unitStandard);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // startFxns();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // startFxns();
    //await readUserLocation to get the location data for the api calls

    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, [storeDispatch]);

  if (Object.keys(realtimeValues).length > 0) {
    const fetchDateTime = new Date(realtimeValues.time);
    currentDate = fetchDateTime.toLocaleString([], {
      weekday: "long",
      day: "numeric",
      year: "numeric",
      month: "long",
    });
    if (is24) {
      time = fetchDateTime.toLocaleTimeString([], {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      time = fetchDateTime.toLocaleTimeString([], {
        hourCycle: "h12",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    UVI = getUVIDescription(realtimeValues?.values.uvIndex);
    windSpeed = `${realtimeValues?.values.windSpeed.toString()}${
      unitStandard === "metric" ? "m/s" : "mph"
    }`;
    feelTemp = Math.floor(realtimeValues?.values.temperatureApparent);
    temp = Math.floor(realtimeValues?.values.temperature);
    humidity = realtimeValues?.values.humidity.toString() + "%";
    visibility = `${Math.floor(realtimeValues?.values.visibility).toString()}${
      unitStandard === "metric" ? "km" : " mi"
    }`;

    pptProb =
      Math.floor(realtimeValues?.values.precipitationProbability).toString() +
      "%";
    realtimeWeatherCode = realtimeValues?.values.weatherCode;
  }

  return (
    <View className="bg-sky-300 flex-grow dark:bg-black ">
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={handleRefresh}
            refreshing={refreshing}
            progressViewOffset={50}
          />
        }
      >
        <Animated.View
          style={{ opacity: opacity }}
          className=" bg-sky-300 flex-grow min-h-screen px-4 pt-16 dark:bg-black "
        >
          {Object.keys(realtimeValues).length > 0 ? (
            <>
              <View className="flex-grow justify-center">
                <View className="bg-sky-400 dark:bg-slate-800 my-2  p-5 flex rounded-xl justify-center">
                  <View className=" justify-center flex-row">
                    <SimpleLineIcons
                      name="location-pin"
                      size={26}
                      color={"white"}
                      style={{ paddingRight: 6 }}
                    />
                    <AppText>{city}</AppText>
                  </View>
                  <AppText className={" text-center pt-4"}>
                    {currentDate}
                  </AppText>
                </View>
                <View className="my-4 bg-sky-400 dark:bg-slate-800 rounded-xl">
                  <AppText className="text-center py-4 font-bold text-xl">
                    Current Weather
                  </AppText>
                </View>
                <View className="bg-sky-400 justify-center dark:bg-slate-800 rounded-xl p-5">
                  <View>
                    <View className="flex-row  justify-center">
                      <TempText className="text-center">{temp}</TempText>
                      <TempText
                        className="pl-1 text-base"
                        style={{ alignSelf: "center" }}
                      >
                        Feels Like {feelTemp}
                      </TempText>
                    </View>
                  </View>
                  <View className=" items-center">
                    <TomorrowWeatherIcon
                      code={realtimeWeatherCode}
                      className="w-14 h-14"
                    />
                    <AppText
                      className={"text-2xl font-semibold py-2 "}
                      style={{ alignSelf: "center" }}
                    >
                      {getWeatherDescription(realtimeWeatherCode)}
                    </AppText>
                  </View>
                  <AppText className={"text-center text-sm"}>
                    as at {time}
                  </AppText>
                </View>
                <View
                  className="bg-sky-400 rounded-xl p-4 my-2 dark:bg-slate-800 flex justify-center "
                  // style={{ backgroundColor: viewBackground }}
                >
                  <View className="flex-row justify-evenly">
                    <View>
                      <View className="flex-row ">
                        <AppText className="text-base">Humidity</AppText>
                        <Entypo name="drop" size={25} color={"white"} />
                      </View>

                      <AppText className="p-2" style={{ alignSelf: "center" }}>
                        {humidity}
                      </AppText>
                    </View>

                    <View>
                      <View className="flex-row">
                        <AppText className="text-base pr-2">UV Index</AppText>
                        <Ionicons name="ios-sunny" size={25} color={"white"} />
                      </View>

                      <AppText className="p-2" style={{ alignSelf: "center" }}>
                        {UVI}
                      </AppText>
                    </View>

                    <View>
                      <View className="flex-row ">
                        <AppText className="text-base pr-2">Windspeed</AppText>
                        <Fontisto name="wind" size={25} color={"white"} />
                      </View>

                      <AppText className="p-2" style={{ alignSelf: "center" }}>
                        {windSpeed}
                      </AppText>
                    </View>
                  </View>
                  <View className="flex-row justify-evenly pt-5">
                    <View>
                      <View className="flex-row">
                        <AppText className="text-base pr-2">Visibility</AppText>
                        <Entypo name="eye" size={25} color={"white"} />
                      </View>

                      <AppText className="p-2" style={{ alignSelf: "center" }}>
                        {visibility}
                      </AppText>
                    </View>
                    <View>
                      <View className="flex-row">
                        <AppText className="text-base pr-2">Rain Prob.</AppText>
                        <Fontisto name="rain" size={25} color={"white"} />
                      </View>

                      <AppText className="p-2" style={{ alignSelf: "center" }}>
                        {pptProb}
                      </AppText>
                    </View>
                  </View>
                </View>
                {hourlyForecast.length > 0 ? (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {hourlyForecast.map(({ time, values }, index) => (
                      <HourlyForecast
                        dateTime={time}
                        temperature={values.temperature}
                        weatherCode={values.weatherCode}
                        key={index}
                      />
                    ))}
                  </ScrollView>
                ) : (
                  <View className="bg-sky-400 my-3 dark:bg-slate-800 rounded-xl p-4">
                    <AppText className="text-center italic ">
                      Refresh to get hourly forecast.
                    </AppText>
                  </View>
                )}
                <Button
                  size="lg"
                  buttonStyle={{ borderRadius: 25, marginVertical: 15 }}
                  containerStyle={{ borderRadius: 70 }}
                  onPress={handleDailyForecast}
                >
                  Daily Forecasts
                </Button>
              </View>
            </>
          ) : (
            <View className="flex-grow justify-center ">
              <AppText className="text-center">{weatherErrorMsg}</AppText>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
