import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useLocation from './app/hooks/useLocation';
import RealtimeWeatherScreen from './app/screens/RealtimeWeatherScreen';
import HourlyForecast from './app/components/HourlyForecast';

export default function App () {
 

  return (
    <View className="bg-sky-400 flex-grow dark:bg-black">
      <RealtimeWeatherScreen/>
      {/* <HourlyForecast/> */}
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
