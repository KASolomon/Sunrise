import axios from 'axios';

export const realtime =  axios.create({
  baseURL: "https://api.tomorrow.io/v4/weather/realtime",
});
export const forecast =  axios.create({
  baseURL: "https://api.tomorrow.io/v4/weather/forecast",
});

