import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Button } from "@rneui/base";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Animated, RefreshControl, ScrollView, View } from "react-native";
import AppText from "../components/AppText";
import TempText from "../components/TempText";

import axios from "axios";
import { useColorScheme } from "nativewind";
import HourlyForecast from "../components/HourlyForecast";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";
import { getUVIDescription, trimApiData } from "../config/utils";
import { weatherCode } from "../config/weatherCodes";
import routes from "../config/routes";
import pass, { geocodingPass } from "../config/pass";
import { getItem, storeItem } from "../config/secureStoreFxns";
import storageKeys from "../config/storageKeys";
import {
  reservedInfoDaily,
  reservedInfoHourly,
} from "../config/reservedWeatherInfo";

export default function RealtimeWeatherScreen({ navigation }) {
  const [weatherData, setWeatherData] = useState();

  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [location, setLocation] = useState();
  const [city, setCity] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [up, setUp] = useState(false);
  const scrollRef = useRef(null);

  const weatherErrorMsg = "🤔 That's strange.\n\nPlease refresh.";

  // Weather constants
  const UVI = getUVIDescription(weatherData?.values.uvIndex);
  const windSpeed = weatherData?.values.windSpeed.toString() + "m/s";
  const dark = true;
  const feelTemp = Math.floor(weatherData?.values.temperatureApparent);
  const temp = Math.floor(weatherData?.values.temperature);
  const humidity = weatherData?.values.humidity.toString() + "%";
  const visibility = Math.floor(weatherData?.values.visibility);
  const pptProb =
    Math.floor(weatherData?.values.precipitationProbability).toString() + "%";
  const realtimeWeatherCode = weatherData?.values.weatherCode;

  //functions
  const getWeatherDescription = (code) => {
    const weatherDesc = weatherCode[code]?.description;
    return weatherDesc;
  };

  const handleDailyForecast = () => {
    navigation.navigate(routes.dailyForecast, { dailyForecast });
  };

  const getLocation = async (setLocation) => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    const APP_NAME = "Sunrise";
    const errorAlert = () => {
      Alert.alert(
        "Location Access Denied",
        `You can grant access anytime in your settings app. ${APP_NAME} needs your location to work properly.`,
        [{ text: "Okay" }]
      );
    };
    if (!granted) {
      return errorAlert();
    }
    try {
      const {
        coords: { latitude, longitude },
        timestamp,
      } = await Location.getCurrentPositionAsync();

      const requiredLoc = { latitude, longitude, timestamp };

      return requiredLoc;
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (location, geocodingPass, setCity) => {
    try {
      const {
        data: { results },
      } = await axios.request({
        url: `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${geocodingPass}`,
      });
      setCity(results[0].components.suburb);
    } catch (error) {
      console.log(error);
    }
  };

  const getRealtimeWeather = async (location, pass, setWeatherData) => {
    try {
      const {
        data: { data },
      } = await axios.request({
        url: `https://api.tomorrow.io/v4/weather/realtime?location=${location.latitude},${location.longitude}&units=metric&apikey=${pass}`,
      });
      data.time = new Date(data.time).toLocaleTimeString([], {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getHourlyForecast = async (
    location,
    pass,
    setHourlyForecast,
    setDailyForecast
  ) => {
    try {
      const { data } = await axios.request({
        url: `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&units=metric&apikey=${pass}`,
      });

      //Extract hourly forecasts for current day
      const fullHForecast = data.timelines.hourly;
      const today = new Date().toISOString();
      const date = today.split("T")[0];
      let currentHourly = [];

      for (let forecast of fullHForecast) {
        if (forecast.time.split("T")[0] == date) {
          currentHourly.push(forecast);
        } else {
          break;
        }
      }
      //send to redux store later
      setHourlyForecast(currentHourly);
      setDailyForecast(data.timelines.daily);

      //trim and store forecast data
      const hourlyForecast = trimApiData(
        data.timelines.hourly,
        reservedInfoHourly
      );

      const dailyForecast = trimApiData(
        data.timelines.daily,
        reservedInfoDaily
      );

      await storeItem(storageKeys.hourly, hourlyForecast);
      await storeItem(storageKeys.daily, dailyForecast);
    } catch (error) {
      try {
        //retrive cached forecast data
        const hourlyForecast = await getItem(storageKeys.hourly);
        const dailyForecast = await getItem(storageKeys.daily);

        //store in state or redux store
        setHourlyForecast(hourlyForecast);
        setDailyForecast(dailyForecast);
      } catch (error) {
        console.log("Error fetching cached forecast ...", error);
      }
      console.log(
        "Error fetching forecast data. Falling back to cache... ",
        error
      );
    }
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

  const startFxns = async () => {
    setCurrentDate(getLocaleDate());
    // const location = await getLocation(setLocation);
    // await getRealtimeWeather(location, pass, setWeatherData);
    // await getCity(location, geocodingPass, setCity);
    // await getHourlyForecast(
    //   location,
    //   pass,
    //   setHourlyForecast,
    //   setDailyForecast
    // );

    // include a boolean in the current weather function to indicate whether weather is fetched or not. Show a loading indicator until weather data is fetched
  };

  const handleRefresh = () => {
    setRefreshing(true);
    startFxns();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startFxns();
    Animated.timing(opacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  }, []);

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
          {weatherData ? (
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
                    as at {weatherData.time}
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
                        {visibility} km
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
