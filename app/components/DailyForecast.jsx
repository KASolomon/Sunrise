import { AntDesign, Entypo, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { weatherCode } from "../config/weatherCodes";
import AppText from "./AppText";
import TempText from "./TempText";
import TomorrowWeatherIcon from "./TomorrowWeatherIcon";

export default function DailyForecast({forecast}) {

  const [showModal, setShowModal] = useState(false);
  const dateFormatted = new Date(forecast.time).toLocaleDateString([], {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const sunrise = new Date(forecast.values.sunriseTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const sunset = new Date(forecast.values.sunsetTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const moonrise = new Date(forecast.values.moonriseTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const moonset = new Date(forecast.values.moonsetTime).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const components = dateFormatted.split(",");
  const weekday = components[0];
  const monthDay = components[1].concat(",", components[2]);
  const weatherDescription =
    weatherCode[forecast.values.weatherCodeMax].description;
  const weatherCodeMax = forecast.values.weatherCodeMax;
  const avgTemp = Math.floor(forecast.values.temperatureAvg);

  
  return (
    <View className=" justify-center flex-grow">
      <Pressable
        onPress={() => setShowModal(true)}
        className="rounded-xl px-3 m-3 flex-row justify-evenly bg-sky-400 dark:bg-slate-800"
      >
        <View className=" items-center justify-center">
          <AppText className="font-bold">{weekday}</AppText>
          <AppText className="text-base">{monthDay}</AppText>
        </View>
        <View className="bg-sky-600 dark:bg-slate-700 rounded-xl items-center mx-5 w-1/3 py-1">
          <View className="flex-grow">
            <TomorrowWeatherIcon
              code={weatherCodeMax}
              style={{ width: 50, height: 50, alignSelf: "center" }}
            />
            <AppText className="text-base text-center">
              {weatherDescription}
            </AppText>
          </View>
        </View>
        <View className=" justify-center">
          <TempText className="text-2xl font-bold">{avgTemp}</TempText>
        </View>
      </Pressable>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View className="bg-sky-800 dark:bg-black flex-grow mt-36">
          <Pressable
            onPress={() => setShowModal(false)}
            className="items-center mx-5 py-4 rounded-xl"
          >
            <AntDesign name="downcircle" size={28} color={"white"} />
          </Pressable>
          <ScrollView>
            <View className="mt-5 mb-12  flex-grow mx-2 p-3 rounded-xl ">
              <View className="bg-sky-600 dark:bg-slate-800 p-3 rounded-xl">
                <AppText className="text-center text-2xl">
                  {dateFormatted}
                </AppText>
                <AppText className="text-center text-base">
                  Forecast Details
                </AppText>
              </View>
              <View className="items-center my-6  rounded-xl p-2">
                <TomorrowWeatherIcon
                  code={weatherCodeMax}
                  style={styles.iconStyle}
                />
                <AppText>{weatherDescription}</AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 mb-5  rounded-xl items">
                <AppText className="text-center mb-4">Sunrise & Sunset</AppText>
                <View className="flex-row justify-between">
                  <View className="w-2/5 items-center">
                    <TomorrowWeatherIcon
                      code={'sunrise'}
                      style={styles.iconStyle}
                    />
                    <AppText>{sunrise}</AppText>
                  </View>
                  <View className="w-2/5  items-center">
                    <TomorrowWeatherIcon
                      code={'sunset'}
                      style={styles.iconStyle}
                    />
                    <AppText>{sunset}</AppText>
                  </View>
                </View>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <FontAwesome name="thermometer-3" size={25} />
                  </AppText>
                  <AppText className="text-center">
                    Temperature (Apparent)
                  </AppText>
                </View>
                <View className="flex-row justify-around">
                  <View>
                    <TempText className="text-lg">
                      Maximum : {Math.floor(forecast.values.temperatureMax)}
                    </TempText>
                    <AppText className="text-center">
                      (
                      <TempText className="text-lg">
                        {Math.floor(forecast.values.temperatureApparentMax)}
                      </TempText>
                      )
                    </AppText>
                  </View>
                  <View>
                    <TempText className="text-lg">
                      Minimum : {Math.floor(forecast.values.temperatureMin)}
                    </TempText>
                    <AppText className="text-center">
                      (
                      <TempText className="text-lg">
                        {Math.floor(forecast.values.temperatureApparentMin)}
                      </TempText>
                      )
                    </AppText>
                  </View>
                </View>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <Ionicons name="ios-sunny" size={25} />
                  </AppText>
                  <AppText className="text-center">UV Index (UVI)</AppText>
                </View>
                <View className="flex-row justify-around my-2">
                  <AppText className="text-lg">
                    Maximum : {forecast.values.uvIndexMax}
                  </AppText>
                  <AppText className="text-lg">
                    Mininum : {forecast.values.uvIndexMin}
                  </AppText>
                </View>
                <AppText className="text-lg text-center">
                  Average : {forecast.values.uvIndexAvg}
                </AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <Fontisto name="wind" size={25} />
                  </AppText>
                  <AppText className="text-center">Windspeed</AppText>
                </View>
                <View className="flex-row justify-around my-2">
                  <AppText className="text-lg">
                    Maximum : {forecast.values.windSpeedMax} m/s
                  </AppText>
                  <AppText className="text-lg">
                    Mininum : {forecast.values.windSpeedMin} m/s
                  </AppText>
                </View>
                <AppText className="text-lg text-center">
                  Average : {forecast.values.windSpeedAvg} m/s
                </AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <Entypo name="eye" size={25} />
                  </AppText>
                  <AppText className="text-center">Visibility</AppText>
                </View>
                <View className="flex-row justify-around my-2">
                  <AppText className="text-lg">
                    Maximum : {forecast.values.visibilityMax} km
                  </AppText>
                  <AppText className="text-lg">
                    Mininum : {forecast.values.visibilityMin} km
                  </AppText>
                </View>
                <AppText className="text-lg text-center">
                  Average : {forecast.values.visibilityAvg} km
                </AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <Entypo name="drop" size={25} />
                  </AppText>
                  <AppText className="text-center">Humidity</AppText>
                </View>
                <View className="flex-row justify-around my-2">
                  <AppText className="text-lg">
                    Maximum : {forecast.values.humidityMax} %
                  </AppText>
                  <AppText className="text-lg">
                    Mininum : {forecast.values.humidityMin} %
                  </AppText>
                </View>
                <AppText className="text-lg text-center">
                  Average : {forecast.values.humidityAvg} %
                </AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 my-5 rounded-xl justify-center">
                <View className=" flex-row rounded-xl mb-4 justify-center">
                  <AppText className="mr-3">
                    <Fontisto name="rain" size={25} />
                  </AppText>
                  <AppText className="text-center">Rain Probability</AppText>
                </View>
                <AppText className="text-lg text-center">
                  {forecast.values.precipitationProbabilityAvg} %
                </AppText>
              </View>
              <View className="bg-sky-600 dark:bg-slate-800 p-3 mb-5  rounded-xl items">
                <AppText className="text-center mb-4">
                  Moonrise & Moonset
                </AppText>
                <View className="flex-row justify-between">
                  <View className="w-2/5 items-center">
                    <TomorrowWeatherIcon
                      code={"moonrise"}
                      style={styles.iconStyle}
                    />
                    <AppText>{moonrise}</AppText>
                  </View>
                  <View className="w-2/5  items-center">
                    <TomorrowWeatherIcon
                      code={"moonset"}
                      style={styles.iconStyle}
                    />
                    <AppText>{moonset}</AppText>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
