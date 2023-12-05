import {
  Entypo,
  Fontisto,
  Ionicons,
  SimpleLineIcons
} from "@expo/vector-icons";
import { Button } from "@rneui/base";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View
} from "react-native";
import AppText from "../components/AppText";
import TempText from "../components/TempText";
import apiEndpoints from "../config/apiEndpoints";
import axiosBase from "../config/axiosBase";
import pass, { geocodingPass } from "../config/pass";
import useLocation from "../hooks/useLocation";

import axios from "axios";
import { useColorScheme } from "nativewind";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";
import { getUVIDescription } from "../config/utils";
import { weatherCode } from "../config/weatherCodes";
export default function RealtimeWeatherScreen() {
  const [weatherData, setWeatherData] = useState({
    time: "13:33",
    values: {
      cloudBase: 1.58,
      cloudCeiling: null,
      cloudCover: 17,
      dewPoint: 19.63,
      freezingRainIntensity: 0,
      humidity: 48,
      precipitationProbability: 0,
      pressureSurfaceLevel: 979.02,
      rainIntensity: 0,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: 31.88,
      temperatureApparent: 33.68,
      uvHealthConcern: 2,
      uvIndex: 5,
      visibility: 12.16,
      weatherCode: 1100,
      windDirection: 284.81,
      windGust: 3.63,
      windSpeed: 0.63,
    },
  });

  const [location, setLocation] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [tabIndex, setTabIndex] = useState();
  const [up, setUp] = useState(false);
  const scrollRef = useRef(null);
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
  const realtimeWeatherCode = weatherData?.values.weatherCode;
  // const sunrise = new Date(weatherData?.sys.sunrise).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  // const sunset = new Date(weatherData?.sys.sunset).toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  const getWeatherDescription = (code = 0) => {
    const weatherDesc = weatherCode[code].description;
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

  const getCity = async (location, geocodingPass) => {
    try {
      
      const { data:{results} } = await axios.request({
        url: `https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${geocodingPass}`,
      });
      console.log('Annotaions' , results[0].annotations);
      console.log('Bounds' ,results[0].bounds);
      console.log('Geometry', results[0].geometry);
      console.log('Components', results[0].components);
    } catch (error) {
      console.log(error)
    }
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

// getCity(location, geocodingPass)
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
                  <Ionicons name="ios-rainy-sharp" size={25} color={"white"} />
                </View>

                <AppText className="p-2" style={{ alignSelf: "center" }}>
                  {pptProb}
                </AppText>
              </View>
            </View>
          </View>
          {/* <Button
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
          /> */}
          {/* forecast views */}
          {/* <Tab
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
          </TabView> */}
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
