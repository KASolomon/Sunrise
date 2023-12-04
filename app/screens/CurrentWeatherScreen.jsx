import {
  View,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import axiosBase, { realtime } from "../config/axiosBase";
import apiEndpoints, { genIconUrl } from "../config/apiEndpoints";
import { useEffect } from "react";
import useLocation from "../hooks/useLocation";
import pass from "../config/pass";
import { Button, Tab, TabView } from "@rneui/base";
import AppText from "../components/AppText";
import TempText from "../components/TempText";
import {
  Ionicons,
  SimpleLineIcons,
  Entypo,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import CachedImage from "../components/CachedImage";

import Icon from "@svgr-iconkit/weather-icons";
import { useColorScheme } from "nativewind";
import axios from "axios";
import { weatherCode } from "../config/weatherCodes";
import { getUVIDescription } from "../config/utils";
export default function CurrentWeatherScreen() {
  const [weatherData, setWeatherData] = useState({
    time: "2023-12-04T14:31:00Z",
    values: {
      cloudBase: null,
      cloudCeiling: null,
      cloudCover: 8,
      dewPoint: 18.63,
      freezingRainIntensity: 0,
      humidity: 42,
      precipitationProbability: 0,
      pressureSurfaceLevel: 977.75,
      rainIntensity: 0,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: 33.13,
      temperatureApparent: 34.43,
      uvHealthConcern: 1,
      uvIndex: 3,
      visibility: 13.13,
      weatherCode: 1000,
      windDirection: 112.5,
      windGust: 3.5,
      windSpeed: 1,
    },
  });

  const [location, setLocation] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [tabIndex, setTabIndex] = useState();
  const [up, setUp] = useState(false);
  const scrollRef = useRef(null);
  const [description, setDescription] = useState();
  // Weather constants
  const city = weatherData?.name;
  const UVI = getUVIDescription(weatherData.values.uvIndex);
  const windSpeed = weatherData?.values.windSpeed.toString() + "m/s";
  const dark = true;
  const feelTemp = Math.floor(weatherData?.values.temperatureApparent);
  const temp = Math.floor(weatherData?.values.temperature);
  const humidity = weatherData?.values.humidity.toString() + "%";
  const visibility = Math.floor(weatherData.values.visibility);
  const pptProb =
    Math.floor(weatherData.values.precipitationProbability).toString() + "%";
  // const sunrise = new Date(weatherData?.sys.sunrise).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const sunset = new Date(weatherData?.sys.sunset).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  const getWeatherDescription = (code = 0) => {
    const weatherDesc = weatherCode[code];
    return weatherDesc;
  };
  const iconColor = "rgba(0,0,0,0.7)";
  const BACK_IMG = dark
    ? "../../assets/pictures/dark.jpeg"
    : "../../assets/pictures/sun.jpg";

  // const viewBackground = "rgb(0, 0, 0)";

  const handleForecastScroll = () => {
    scrollRef.current?.scrollTo({ y: up ? 450 : -300, animated: true });
    setUp(!up);
  };

  const getLocation = async () => {
    const currentLocation = await useLocation();
    setLocation(currentLocation);
  };

  const getRealtimeWeather = async (location, pass) => {
    try {
      const {
        data: { data },
      } = await axios.request({
        url: `https://api.tomorrow.io/v4/weather/realtime?location=${location.latitude},${location.longitude}&units=metric&apikey=${pass}`,
      });
      let fetchTime = data.time;
      const tIndex = fetchTime.indexOf("T");
      fetchTime = fetchTime.slice(tIndex + 1, tIndex + 6);
      data.time = fetchTime;

      setWeatherData(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getForecast = async (location, pass) => {
    try {
      // Get weather data using axios
      const { data } = await axiosBase.request({
        url: `${apiEndpoints.forecast5}?lat=${location.latitude}&lon=${location.longitude}&appid=${pass}&units=metric`,
      });

      // setWeatherData(data);

      // Get weather data using the fetch API
      // const response = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${pass}`
      // );
      // const converted = await response.json()
      console.log(data);
    } catch (error) {
      console.log(error);
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

  const { colorScheme } = useColorScheme();

  const updateTabViewStyle = useCallback(
    (colorScheme) => (colorScheme == "dark" ? "#1e293b" : "#38bdf8"),
    [colorScheme]
  );
  useEffect(() => {
    getLocation();
    const dateString = getLocaleDate();
    setCurrentDate(dateString);
    // include a boolean in the current weather function to indicate whether weather is fetched or not. Show a loading indicator until weather data is fetched
  }, [location]);

  //   useCallback(()=>{    getCurrentWeather(location, pass);
  // }, [location])()
  //   getLocaleDate();
  return (
    <View className=" bg-sky-300 flex-grow px-4  pt-14 dark:bg-black">
      <View className="flex-grow ">
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          // style={{ flex: 1 }}
        >
          <View
            className="bg-sky-400 dark:bg-slate-800 my-2  p-5 flex rounded-xl justify-center"
            // style={{ backgroundColor: viewBackground }}
          >
            <View className=" justify-center flex-row">
              <SimpleLineIcons
                name="location-pin"
                size={26}
                color={"white"}
                style={{ paddingRight: 6 }}
              />
              <AppText>{city}</AppText>
            </View>
            <AppText className={" text-center pt-4"}>{currentDate}</AppText>
          </View>
          <View className="bg-sky-400 justify-center dark:bg-slate-800 rounded-xl p-5">
            <View>
              <View className="flex-row  justify-center">
                <TempText className="text-center">{temp}</TempText>
                <AppText
                  className="pl-1 text-base"
                  style={{ alignSelf: "center" }}
                >
                  Feels Like {feelTemp}°
                </AppText>
              </View>
              <AppText className={"text-center text-sm"}>
                as at {weatherData.time}
              </AppText>
            </View>
            <View className=" items-center">
              {/* {weatherData && (
                <CachedImage
                  imageUri={genIconUrl(weatherData?.weather[0].icon)}
                />
              )} */}
              <AppText
                className={"text-2xl font-semibold "}
                style={{ alignSelf: "center" }}
              >
                {getWeatherDescription(weatherData?.values.weatherCode)}
              </AppText>
            </View>
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
                  <Ionicons name="ios-rainy-sharp" size={25} color={"white"} />
                </View>

                <AppText className="p-2" style={{ alignSelf: "center" }}>
                  {pptProb}
                </AppText>
              </View>
            </View>
          </View>
          <Button
            type="clear"
            size="sm"
            className="mb-6"
            TouchableComponent={TouchableWithoutFeedback}
            icon={
              up ? (
                <Entypo name="chevron-down" size={25} color={"white"} />
              ) : (
                <Entypo name="chevron-up" size={25} color={"white"} />
              )
            }
            onPress={handleForecastScroll}
          />
          {/* forecast views */}
          <Tab
            value={tabIndex}
            onChange={(e) => {
              setTabIndex(e);
            }}
            containerStyle={{
              backgroundColor: updateTabViewStyle(colorScheme),
            }}
            titleStyle={{ color: "white" }}
            indicatorStyle={{
              backgroundColor: colorScheme == "dark" ? "#fff" : "#0369a1",
            }}
            scrollable={true}
          >
            <Tab.Item
              title={"Hourly Forecast"}
              icon={{
                type: "simple-line-icon",
                name: "clock",
                color: "white",
              }}
              iconPosition="left"
            />
            <Tab.Item
              title={"Weekly Forecast"}
              icon={{
                type: "ionicon",
                name: "calendar-outline",
                color: "white",
              }}
              iconPosition="left"
            />
          </Tab>
          <TabView
            value={tabIndex}
            onChange={setTabIndex}
            // tabItemContainerStyle={{ overflow: "scroll" }}
            containerStyle={{
              paddingBottom: "80%",
              maxHeight: "60%",
              backgroundColor: colorScheme == "dark" ? "#1e293b" : "#38bdf8",
            }}
            animationType="spring"
          >
            <TabView.Item>
              <View>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Hourly Forecast</AppText>
                <AppText>Week 32334 Forecast</AppText>
              </View>
            </TabView.Item>
            <TabView.Item>
              <AppText>Weekly Forecast</AppText>
            </TabView.Item>
          </TabView>
          {/* <View className="bg-orange-400 min-h-fit flex">
          </View> */}

          {/* THE SCROLLVIEW CUTS SOME OF THE CONTENT OFF AFTER SETTING TABVIEW HEIGHTS IN PERCENTAGES. USING NORMAL PIXELS STOPS THE PROBLEM. Use paddingBottom in percentage if the percentage is required */}
          <Button onPress={() => getRealtimeWeather(location, pass)}>
            Get Forecast
          </Button>
        </ScrollView>
      </View>
    </View>
  );
}
