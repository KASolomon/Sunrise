import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Alert } from "react-native";

export const apiCallStarted = createAction("apiCallStarted");

export const apiMiddleware =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallStarted.type) {
      
      return next(action);
    }

    const { url, onSuccess, onFailure } = action.payload;
    // console.log(url)
    next(action);
    try {
      const { data } = await axios.request({ url });
      // console.log(data)
      dispatch({ type: onSuccess, payload: data });
    } catch (error) {
      console.log(error.message, "From api middleware");
      return;
      onFailure
        ? dispatch({ type: onFailure, payload: error.message })
        : Alert.alert("Oops", "We couldn't get the data", [
            {
              text: "Try again",
              onPress: dispatch({
                type: apiCallStarted.type,
                payload: action.payload,
              }),
              isPreferred: true,
              style: { backgroundColor: "#172554", borderRadius: 25 },
            },
            {
              text: "Close",
              style: { backgroundColor: "#f1f5f9", borderRadius: 25 },
            },
          ]);
    }
  };
