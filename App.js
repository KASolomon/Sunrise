import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import RainAnimation from './app/components/RainAnimation';
import useLocation from './app/refs/useLocation';

export default function App () {
 
  const getLocation = async ()=>{

    const location = await useLocation();
    console.log(location)
  }
  getLocation();
  
//User the location to get the current weather using OpenWeatherMap's API

  return (
    <View className=" flex-grow ">
      
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
