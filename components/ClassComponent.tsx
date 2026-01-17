import { styles } from "@/config/styles";
import { Class } from "@/schema/create-class";
import { Crown } from "lucide-react-native";
import React from "react";
import { Text, View, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const ClassComponent = ({
  item,
  viewableItems,
}: {
  item: Class;
  viewableItems: SharedValue<ViewToken<any>[]>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value.some(
      (viewableItem) => viewableItem.item?.id === item.id,
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0, { duration: 300 }),
      transform: [
        {
          translateY: withTiming(isVisible ? 0 : 20, { duration: 300 }),
        },
        {
          scale: withTiming(isVisible ? 1 : 0.96, { duration: 300 }),
        },
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.courseButton, animatedStyle]}>
      <View style={{ gap: 3, flex: 1 }}>
        <Text style={styles.subTitle}>{item.name}</Text>
        <Text style={styles.secondary}>{item.credits} credits</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        {item.grade.includes("A") && (
          <Crown size={15} fill="#fad348" strokeWidth={0} />
        )}
        {item.grade.includes("B") && (
          <Crown size={15} fill="#c9c9c9" strokeWidth={0} />
        )}
        <Text style={styles.label}>{item.grade}</Text>
      </View>
    </Animated.View>
  );
};

export default ClassComponent;
