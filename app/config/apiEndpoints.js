//all api endpoints are based on openweathermap's api

export default {
  currentWeather: "/weather",
  forecast5: "/forecast",
};

export const genIconUrl = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;