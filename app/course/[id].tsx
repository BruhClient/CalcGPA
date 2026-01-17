import ClassList from "@/components/ClassList";
import GPAPieChart from "@/components/GPAPieChart";
import ClassModal from "@/components/modals/ClassModal";
import CourseModal from "@/components/modals/CourseModal";
import { COLORS } from "@/config/colors";
import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { calculateGPA } from "@/lib/calculate-gpa";
import { createClassSchema } from "@/schema/create-class";
import { createCourseSchema } from "@/schema/create-course";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeft, Settings } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

const CourseScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const { getCourseById, updateCourse } = useCourses();
  const course = getCourseById(id);

  const update = async ({
    course: name,
    institution,
    type,
  }: {
    course: string;
    institution: string;
    type: number;
  }) => {
    const payload = {
      id,
      name,
      institution,
      type,
      classes: course?.classes ?? [],
    };

    createCourseSchema.parse(payload);

    if (type !== course?.type) {
      const grades = payload.classes.map((item) => {
        return { grade: item.grade, credits: item.credits };
      });
      const gpa = calculateGPA({ grades, maxGPA: type }).toString();
      await updateCourse(id, {
        ...payload,
        gpa,
      });
    } else {
      await updateCourse(id, payload);
    }

    setSettingsVisible(false);
  };
  const addClass = async ({
    className,
    grade,
    credits,
    year,
    semester,
  }: {
    className: string;
    credits: string;
    grade: string;
    year: string;
    semester: string;
  }) => {
    const class_id = uuidv4();
    const payload = {
      id: class_id,
      name: className,
      grade,
      credits: parseInt(credits),
      year,
      semester,
    };
    createClassSchema.parse(payload);

    const updatedClasses = course?.classes
      ? [payload, ...course.classes]
      : [payload];
    const grades = updatedClasses.map((item) => {
      return { grade: item.grade, credits: item.credits };
    });

    const gpa = calculateGPA({ grades, maxGPA: course!.type }).toString();

    await updateCourse(id, {
      classes: updatedClasses,
      gpa,
    });

    setVisible(false);
  };

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.secondary}>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        gap: 20,
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
        <View
          style={{
            flex: 1,

            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.title}>{course.name}</Text>
            <Text style={styles.secondary}>{course.institution}</Text>
          </View>
          <TouchableOpacity onPress={() => setSettingsVisible(true)}>
            <Settings color={COLORS.text} style={{ paddingRight: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
      <GPAPieChart
        maxGPA={course.type}
        classes={
          course.classes?.filter((item) => {
            const code = `Y${item.year}S${item.semester}`;
            return (
              selectedFilters.length === 0 || selectedFilters.includes(code)
            );
          }) || []
        }
      />

      <ClassList
        id={id}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        createClassVisible={visible}
        setCreateClassVisible={setVisible}
      />
      <ClassModal
        id={id}
        classId={id}
        visible={visible}
        setVisible={setVisible}
        onSubmit={addClass}
      />
      <CourseModal
        buttonText="Save Changes"
        title={"Update Degree/Diploma"}
        resetUponCompletion={false}
        visible={settingsVisible}
        setVisible={setSettingsVisible}
        onSubmit={update}
        includeDelete
        modalText1="Course Updated"
        modalText2="Your changes have been saved"
        id={id}
        initialValues={{
          course: course.name,
          ...course,
        }}
      />
    </View>
  );
};

export default CourseScreen;
