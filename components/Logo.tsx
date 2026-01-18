import { Pyramid } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
const Logo = () => {
  return (
    <View
      style={{
        backgroundColor: "#92FFAA",
        padding: 8,
        alignSelf: "flex-start",
        borderRadius: 8,
      }}
    >
      <Pyramid size={20} />
    </View>
  );
};

export default Logo;
