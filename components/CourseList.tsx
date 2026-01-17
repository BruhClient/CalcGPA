import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import CourseComponent from "./CourseComponent";

const CourseList = () => {
  const { courses } = useCourses();
  const router = useRouter();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const navigating = React.useRef(false);

  const safePush = (href: string) => {
    if (navigating.current) return;

    navigating.current = true;
    // @ts-ignore
    router.push(href);

    setTimeout(() => {
      navigating.current = false;
    }, 300);
  };

  if (courses.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...styles.secondary, textAlign: "center" }}>
          No Courses Added
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ flex: 1 }} // take up remaining space
      contentContainerStyle={{ paddingVertical: 10 }}
      data={courses}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => safePush(`/course/${item.id}`)}>
          <CourseComponent item={item} viewableItems={viewableItems} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CourseList;
