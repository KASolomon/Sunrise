import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import useLocation from "../hooks/useLocation";
import { apiCallStarted } from "./apiMiddleware";
import apiEndpoints from "../config/apiEndpoints";

// create slice
const userData = createSlice({
  name: "userData",
  initialState: { location: {}, city: "", unitStandard: "metric", loading: false },
  reducers: {
    locationAdded: (state, action) => {
      state.location = action.payload;
    },
    cityAdded: (state, { payload }) => {
      const { results } = payload;

      state.city = results[0].components.suburb;
    },
    toggleUnit: (state, action) => {
      state.unitStandard = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLocationThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLocationThunk.fulfilled, (state, action) => {
      state.location = action.payload;
      state.loading = false;
    });
  },
  selectors: {
    getUserLocation: (state) => state.location,
    getUnitStandard: (state) => state.unitStandard,
    getUserCity : state => state.city
  },
});

//Async thunk for getting user location

const userLocationThunk = createAsyncThunk(
  "userData/locationAdded",
  async () => await useLocation()
);

export const readUserLocation = async (dispatch) => {
  return await dispatch(userLocationThunk()).unwrap();
};
export const fetchUserCity = (storeDispatch, location)=>{
   storeDispatch(
     apiCallStarted({
       url: apiEndpoints.geocoding(location),
       onSuccess: cityAdded.type,
     })
   );
   
}

//exports
export const { locationAdded, toggleUnit, cityAdded } = userData.actions;
export const { reducer } = userData;
export const { getUnitStandard, getUserLocation, getUserCity } = userData.selectors;
