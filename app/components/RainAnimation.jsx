import { View, Text } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { Button } from "@rneui/base";

export default function RainAnimation() {
  const animationRef = useRef(null);
  const handleAnimate = () => {

    animationRef.current?.reset();

    animationRef.current?.play();
  };
  return (
    <View className="flex-grow ">
      <LottieView
        ref={animationRef}
        source={require("../../assets/animations/Animation - 1700840309923.json")}
        className="w-1/2 h-1/2"
      />
      <Button onPress={handleAnimate}>Animate</Button>
    </View>
  );
}
