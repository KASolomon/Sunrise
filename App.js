import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useLocation from './app/hooks/useLocation';
import RealtimeWeatherScreen from './app/screens/RealtimeWeatherScreen';
import HourlyForecast from './app/components/HourlyForecast';
import DailyForecastScreen from './app/screens/DailyForecastScreen';

export default function App () {
 

  return (
    <View className="flex-grow dark:bg-black">
      {/* <RealtimeWeatherScreen/> */}
      <DailyForecastScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
