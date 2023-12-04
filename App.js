import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RainAnimation from './app/components/RainAnimation';
import useLocation from './app/hooks/useLocation';
import CurrentWeatherScreen from './app/screens/CurrentWeatherScreen';
import CachedImage from './app/components/CachedImage';
import { genIconUrl } from './app/config/apiEndpoints';

export default function App () {
 
  const getLocation = async ()=>{

    const location = await useLocation();
    console.log(location)
  }
  // getLocation();
  
//Use the location to get the current weather using OpenWeatherMap's API

  return (
    <View className=" flex-grow">
      {/* <CachedImage imageUri={genIconUrl("03d")} /> */}
      <CurrentWeatherScreen/>
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
