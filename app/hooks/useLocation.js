import * as Location from "expo-location";
import { Alert } from "react-native";

export default useLocation = async () => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  const APP_NAME = "Sunrise";
  const errorAlert = () => {
    Alert.alert(
      "Location Access Denied",
      `You can grant access anytime in your settings app. ${APP_NAME} needs your location to work properly.`,
      [{ text: "Okay" }]
    );
  };
  if (!granted) {
    return errorAlert();
  }

  const {
    coords: { latitude, longitude },
    timestamp,
  } = await Location.getCurrentPositionAsync();

  const geocode = await Location.reverseGeocodeAsync({latitude, longitude})

  console.log(geocode)

  // return { latitude, longitude, timestamp };
};
