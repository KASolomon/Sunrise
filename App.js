import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import AppBottomTabNavigator from "./app/navigators/AppBottomTabNavigator";
import sunriseStore from './app/store/store';

export default function App() {
  return (
    <Provider store={sunriseStore}>
      <NavigationContainer>
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
