import * as Location from "expo-location";

export default useLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (!status) {
    return {
      error:
        "This feature may not work properly since app has no access to location.",
    };
  }

  const {
    coords: { latitude, longitude },
    timestamp,
  } = await Location.getCurrentPositionAsync();
  return { latitude, longitude, timestamp };
};
