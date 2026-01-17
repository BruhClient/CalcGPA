import { styles } from "@/config/styles";
import { Course } from "@/schema/create-course";
import React from "react";
import { Text, View, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const CourseComponent = ({
  item,
  viewableItems,
}: {
  item: Course;
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
        <Text style={styles.secondary}>{item.institution}</Text>
      </View>
      <Text style={styles.label}>
        {item.classes?.length
          ? item.gpa != null
            ? `${item.gpa}/${item.type}`
            : "NIL"
          : "NIL"}
      </Text>
    </Animated.View>
  );
};

export default CourseComponent;
