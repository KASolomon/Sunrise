import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View,  Appearance } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import AppBottomTabNavigator from "./app/navigators/AppBottomTabNavigator";
import sunriseStore from "./app/store/store";
import { useColorScheme } from 'nativewind';
import WebviewScreen from "./app/screens/WebviewScreen";

export default function App() {
  const { colorScheme} = useColorScheme()
  const [scheme, setScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme }) => setScheme(colorScheme)
    );
    return subscription.remove;
  });
  const lightTheme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, card: "rgb(14,165,233)", text : 'rgb(0,0,0)'  },
  };


  // console.log(DarkTheme);
  // console.log(DefaultTheme);
  return (
    <Provider store={sunriseStore}>
      <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : lightTheme}>
        <View className=" flex-grow dark:bg-slate-800">
          <AppBottomTabNavigator />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
