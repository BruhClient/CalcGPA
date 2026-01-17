import SocialMediaComponent from "@/components/SocialMediaComponent";
import { COLORS } from "@/config/colors";
import { styles } from "@/config/styles";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Github,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
  const router = useRouter();
  return (
    <View
      style={{
        gap: 15,
        flex: 1,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ paddingRight: 10 }}
        >
          <ChevronLeft size={30} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Credits </Text>
      </View>

      <View style={{ padding: 10, gap: 15 }}>
        <View style={{ gap: 5 }}>
          <Text style={styles.title}>About me</Text>
          <Text style={styles.secondary}>
            Hey! I'm Travis Ang, a passionate developer dedicated to crafting
            seamless and efficient applications. This GPA Calculator app is a
            labor of love, built to help students easily track and manage their
            academic performance. I hope you find it useful!
          </Text>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={styles.title}>My Socials</Text>
          <SocialMediaComponent
            Icon={Instagram}
            backgroundColor="#fa3754"
            url="https://www.instagram.com/____travisang____"
          />
          <SocialMediaComponent
            Icon={Linkedin}
            backgroundColor="#34c5fa"
            url="https://www.linkedin.com/in/travis-ang"
          />
          <SocialMediaComponent
            Icon={Github}
            backgroundColor="#000"
            url="https://github.com/BruhClient"
          />
          <SocialMediaComponent
            Icon={Send}
            backgroundColor="#5a55fa"
            url="https://t.me/Travshiwo
"
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
