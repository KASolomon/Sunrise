import { Image } from "expo-image";
import React from "react";
import { StyleSheet } from "react-native";
export default function CachedImage({ imageUri, ...rest }) {
  return (
    <Image
      style={{ width: 100, height: 60,}}
      source={imageUri}
      contentFit="cover"
      contentPosition={"center"}
      transition={700}
        {...rest}
    />
  );
}

const styles = StyleSheet.create({});
