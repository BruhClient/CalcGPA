import { COLORS } from "@/config/colors";
import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { calculateGPA } from "@/lib/calculate-gpa";
import { Class, createClassSchema } from "@/schema/create-class";
import { Plus } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import ClassComponent from "./ClassComponent";
import ClassModal from "./modals/ClassModal";

const ClassList = ({
  id,
  selectedFilters,
  setSelectedFilters,
  createClassVisible,
  setCreateClassVisible,
}: {
  id: string;
  createClassVisible: boolean;
  setCreateClassVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { getCourseById, updateCourse } = useCourses();
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const [visible, setVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const course = getCourseById(id);

  const classes = useMemo(() => course?.classes ?? [], [course]);

  const filters = useMemo(() => {
    const set = new Set<string>();

    for (const item of classes) {
      if (item.year && item.semester) {
        set.add(`Y${item.year}S${item.semester}`);
      }
    }

    return Array.from(set).sort((a, b) => {
      const [, yA, sA] = a.match(/Y(\d+)S(\d+)/)!;
      const [, yB, sB] = b.match(/Y(\d+)S(\d+)/)!;

      const yearDiff = Number(yA) - Number(yB);
      if (yearDiff !== 0) return yearDiff;

      return Number(sA) - Number(sB); // S1 before S4
    });
  }, [classes]);

  const update = async ({
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
    const payload = {
      id: selectedClass?.id || "",
      name: className,
      grade,
      credits: parseInt(credits),
      year,
      semester,
    };
    createClassSchema.parse(payload);

    const updatedClasses = course?.classes?.map((item) => {
      if (item.id === selectedClass?.id) {
        return payload;
      }
      return item;
    });

    if (grade !== selectedClass?.grade && updatedClasses && course) {
      const grades = updatedClasses?.map((item) => {
        return { grade: item.grade, credits: item.credits };
      });
      const gpa = calculateGPA({ grades, maxGPA: course?.type }).toString();

      await updateCourse(id, {
        classes: updatedClasses,
        gpa,
      });
    } else {
      await updateCourse(id, {
        classes: updatedClasses,
      });
    }

    setVisible(false);
  };
  if (classes.length === 0) {
    return (
      <>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => setCreateClassVisible(true)}
        >
          <Text style={styles.buttonText}>Create Class</Text>
        </TouchableOpacity>
        <Text
          style={{
            ...styles.secondary,
            textAlign: "center",
            paddingVertical: 10,
          }}
        >
          No Classes Added
        </Text>
      </>
    );
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 10,

          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          style={styles.filterButtonInactive}
          onPress={() => {
            setCreateClassVisible(true);
          }}
        >
          <Plus size={15} strokeWidth={3} color={COLORS.text} />
        </TouchableOpacity>
        {filters &&
          filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={
                selectedFilters.includes(filter)
                  ? styles.filterButtonActive
                  : styles.filterButtonInactive
              }
              onPress={() => {
                if (selectedFilters.includes(filter)) {
                  setSelectedFilters((prev) =>
                    prev.filter((item) => item !== filter),
                  );
                } else {
                  setSelectedFilters((prev) => [...prev, filter]);
                }
              }}
            >
              <Text
                style={
                  selectedFilters.includes(filter)
                    ? styles.activeButtonText
                    : styles.label
                }
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
      <FlatList
        style={{ flex: 1 }}
        data={classes.filter((item) => {
          if (selectedFilters.length === 0) return true;
          const filterKey = `Y${item.year}S${item.semester}`;
          return selectedFilters.includes(filterKey);
        })}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }: { item: Class }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedClass(item);
              setVisible(true);
            }}
          >
            <ClassComponent item={item} viewableItems={viewableItems} />
          </TouchableOpacity>
        )}
      />

      {selectedClass && (
        <ClassModal
          resetUponCompletion={false}
          visible={visible}
          classId={selectedClass.id}
          id={id}
          includeDelete
          modelText1="Class Updated"
          modalText2="You have successfully updated the class."
          buttonText="Update"
          setVisible={setVisible}
          onSubmit={update}
          initialValues={{
            className: selectedClass.name,
            semester: selectedClass.semester,
            credits: selectedClass.credits.toString(),
            grade: selectedClass.grade,
            year: selectedClass.year,
          }}
        />
      )}
    </>
  );
};

export default ClassList;
