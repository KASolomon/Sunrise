import { createSlice } from "@reduxjs/toolkit";
import apiEndpoints from "../config/apiEndpoints";
import { apiCallStarted } from "./apiMiddleware";
import {
  reservedInfoDaily,
  reservedInfoHourly,
} from "../config/reservedWeatherInfo";
import { trimApiData } from "../config/utils";

const timeSpacedWeather = createSlice({
  name: "timeSpacedWeather",
  initialState: { daily: [], hourly: [] },
  reducers: {
    timedWeatherAdded: (state, { payload: { timelines } }) => {
      //Extract hourly forecasts for current day
      const fullHForecast = timelines.hourly;
      const today = new Date().toISOString();
      const date = today.split("T")[0];
      let currentHourly = [];

      for (let forecast of fullHForecast) {
        if (forecast.time.split("T")[0] == date) {
          currentHourly.push(forecast);
        } else {
          break;
        }
      }

      //trim and store forecast data
      const hourlyForecast = trimApiData(currentHourly, reservedInfoHourly);

      const dailyForecast = trimApiData(timelines.daily, reservedInfoDaily);

      state.hourly = hourlyForecast;
      state.daily = dailyForecast;
    },
  },
  selectors: {
    getDailyForecast: (state) => state.daily,
    getHourlyForecast: (state) => state.hourly,
  },
});

export const fetchTimeSpacedWeather = (
  storeDispatch,
  location,
  unitStandard
) => {
  storeDispatch(
    apiCallStarted({
      url: apiEndpoints.timedForecast(location, unitStandard),
      onSuccess: timedWeatherAdded.type,
    })
  );
};

export const { reducer } = timeSpacedWeather;
export const { timedWeatherAdded } = timeSpacedWeather.actions;
export const { getDailyForecast, getHourlyForecast } =
  timeSpacedWeather.selectors;
