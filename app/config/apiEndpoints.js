import { geocodingPass, weatherPass } from "./pass";



export default apiEndpoints = {
  geocoding({ latitude, longitude }) {
    return `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${geocodingPass}`;
  },
  realtimeWeather({ latitude, longitude }, unitStandard) {
    return `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&units=${unitStandard}&apikey=${weatherPass}`;
  },
  timedForecast({ latitude, longitude }, unitStandard) {
    return `https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&units=${unitStandard}&apikey=${weatherPass}`;
  },
};
