import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "./apiMiddleware";
import { reducer as userDataReducer } from "./userData";
import { reducer as realtimeReducer} from "./realtime";
import { reducer as timeSpacedReducer } from "./timeSpacedWeather";

export default sunriseStore = configureStore({
  reducer: {
    userData: userDataReducer,
    realtimeWeather: realtimeReducer,
    timeSpacedWeather: timeSpacedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
});

