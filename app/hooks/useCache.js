import * as SecureStore from "expo-secure-store";
import storageKeys from "../config/storageKeys";

const storeItem = async (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    await SecureStore.setItemAsync(key, serialized);
  } catch (error) {
    console.log("Error storing cache : ", error);
  }
};
const getItem = async (key) => {
  try {
    const data = await SecureStore.getItemAsync(key);
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.log("Error fetching cache : ", error);
  }
};

export default useCache = (command, data, storeDispatch) => {
 switch(command){
    case 'storeTimedWeather':
        //store data with the format {timelines :{daily :[], hourly :[]}}
        storeItem(storageKeys.daily, data)
    case 'storeRealtime':
        storeItem(storageKeys.realtime, data)
    case 'retrieveTimedWeather':
        getItem(storageKeys.daily)
    case 'retrieveRealtime':
        getItem(storageKeys.realtime)
  
 }
};
