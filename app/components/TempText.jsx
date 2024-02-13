import React from "react";
import { StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { getUnitStandard } from "../store/userData";

export default function TempText({ children, style = {} }) {

  const unitStandard = useSelector(getUnitStandard)
const unit = unitStandard == "metric" ? "°C" : "°F";

  return (
    <Text
      style={[styles.text, style]}
      className="text-center text-white font-semibold text-6xl"
    >
      {children}{unit}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif",
  },
});
