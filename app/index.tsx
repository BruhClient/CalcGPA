import CourseList from "@/components/CourseList";
import Logo from "@/components/Logo";
import CourseModal from "@/components/modals/CourseModal";
import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { createCourseSchema } from "@/schema/create-course";
import { useRouter } from "expo-router";
import { PartyPopper } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function Index() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const { addCourse } = useCourses();
  const onFormSubmit = async ({
    course,
    institution,
    type,
  }: {
    course: string;
    institution: string;
    type: number;
  }) => {
    const id = uuidv4();
    const payload = {
      id,
      name: course.trim(),
      institution: institution.trim(),
      type,
      classes: [],
    };
    createCourseSchema.parse(payload);
    await addCourse(payload);
    setVisible(false);
  };

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
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Logo />
          <Text style={styles.title}>CalcGPA</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/settings")}
          style={{
            paddingRight: 5,
          }}
        >
          <PartyPopper />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.title}>New Diploma/Degree</Text>
      </TouchableOpacity>

      <CourseList />
      <CourseModal
        buttonText="Create"
        title="New Degree/Diploma"
        visible={visible}
        setVisible={setVisible}
        onSubmit={onFormSubmit}
      />
    </View>
  );
}
