import { LucideIcon } from "lucide-react-native";
import React from "react";
import { Linking, TouchableOpacity } from "react-native";

const SocialMediaComponent = ({
  Icon,
  backgroundColor,
  url,
}: {
  Icon: LucideIcon;
  backgroundColor: string;
  url: string;
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRadius: 5,
      }}
      onPress={() => {
        Linking.openURL(url);
      }}
    >
      <Icon color={"white"} />
    </TouchableOpacity>
  );
};

export default SocialMediaComponent;
