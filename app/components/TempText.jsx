import React from "react";
import { StyleSheet, Text } from "react-native";

export default function TempText({ children, style = {} }) {
  return (
    <Text
      style={[styles.text, style]}
      className="text-center text-white font-semibold text-6xl"
    >
      {children}°C
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif",
  },
});
