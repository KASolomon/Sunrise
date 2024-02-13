import { FAB } from "@rneui/base";
import React, { useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import AppText from "../components/AppText";
import DailyForecast from "../components/DailyForecast";
import TomorrowWeatherIcon from "../components/TomorrowWeatherIcon";
import { useSelector } from "react-redux";
import { getDailyForecast } from "../store/timeSpacedWeather";

export default function DailyForecastScreen({ route }) {
  const forecast = useSelector(getDailyForecast)
  const [refreshing, setRefreshing] = useState(false);
  const [fabVisible, setFabVisible] = useState(false);
  const listRef = useRef(null);
  const handleRefresh = () => {
    setRefreshing(true);
    //dispatch store action to trigger api middleware that fetches weather data
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleScrollToTop = () => {
    listRef.current.scrollToIndex({
      animated: true,
      index: 0,
      viewPosition: 1,
    });
  };
  return (
    <View className="dark:bg-black pt-24 flex-grow">
      <>
        <FlatList
          data={forecast}
          ref={listRef}
          contentContainerStyle={{flex:1}}
          renderItem={({ item, index }) => (
            <DailyForecast forecast={item} key={index} />
          )}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
          }
          onScroll={({ nativeEvent }) => {
            if (nativeEvent.contentOffset.y > 0 && !fabVisible) {
              setFabVisible(true);
            } else if (nativeEvent.contentOffset.y <= 0 && fabVisible) {
              setFabVisible(false);
            }
          }}
          ListHeaderComponent={
            <AppText className="text-center text-2xl my-2">
              Daily Forecast
            </AppText>
          }
          ListEmptyComponent={
            <View className="flex-grow justify-center items-center ">
              <TomorrowWeatherIcon code={1101} style={{width : 80, height : 80, marginBottom : 20}} />
              <AppText>
                That rarely happens.
              </AppText>
              <AppText>
               Please refresh to get latest forecast.
              </AppText>
            </View>
          }
        />
        <FAB
          icon={{ name: "keyboard-arrow-up", color: "white" }}
          size="large"
          visible={fabVisible}
          onPress={handleScrollToTop}
          // placement="right"
          style={{ position: "absolute", bottom: 20, right: 40 }}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({});
