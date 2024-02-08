import { createSlice } from "@reduxjs/toolkit";
import apiEndpoints from "../config/apiEndpoints";
import { apiCallStarted } from "./apiMiddleware";
import * as Localization from 'expo-localization'


const realtime = createSlice({
  name: "realtimeWeather",
  reducers: {
    realtimeUpdated: (state, { payload: { data } }) => {
      return data;
    },
  },
  initialState: {},
  selectors: {
    getRealtimeWeather: (state) => state,
    getFetchTime : state => state.time
  },
});

export const fetchRealtimeWeather = (storeDispatch, location, unitStandard) => {
  storeDispatch(
    apiCallStarted({
      url: apiEndpoints.realtimeWeather(location, unitStandard),
      onSuccess: realtimeUpdated.type,
    })
  );
};

export const { realtimeUpdated } = realtime.actions;

export const { reducer } = realtime;

export const { getRealtimeWeather, getFetchTime } = realtime.selectors;
