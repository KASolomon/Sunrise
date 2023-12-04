import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function AppText({children, style=[{}]}) {
  return (
    <Text style={[styles.text, ...style]} className="text-white">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif",
    fontSize: 20,
  },
});
