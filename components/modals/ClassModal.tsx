import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { calculateGPA } from "@/lib/calculate-gpa";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import z from "zod";
import CustomInput from "../Input";
import CustomSelect from "../Select";

type Payload = {
  className: string;
  credits: string;
  grade: string;
  year: string;
  semester: string;
};
const ClassModal = ({
  visible,
  setVisible,
  onSubmit,
  initialValues,
  id,
  modelText1 = "Class Created! ",
  modalText2 = "You can start adding more classes or recording your GPA",
  classId,
  buttonText = "Create",
  includeDelete,
  resetUponCompletion = true,
}: {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onSubmit: ({ className, credits, grade, year, semester }: Payload) => void;
  initialValues?: Payload;
  id: string;
  modelText1?: string;
  modalText2?: string;
  buttonText?: string;
  classId: string;
  includeDelete?: boolean;
  resetUponCompletion?: boolean;
}) => {
  const [className, setClassName] = useState(initialValues?.className ?? "");
  const [credits, setCredits] = useState(initialValues?.credits ?? "3");
  const [grade, setGrade] = useState<string | number>(
    initialValues?.grade ?? "A+",
  );
  const { getCourseById, updateCourse } = useCourses();
  const [year, setYear] = useState(initialValues?.year ?? "1");
  const [semester, setSemester] = useState(initialValues?.semester ?? "1");

  useEffect(() => {
    setClassName(initialValues?.className ?? "");
    setCredits(initialValues?.credits ?? "3");
    setGrade(initialValues?.grade ?? "A+");
    setYear(initialValues?.year ?? "1");
    setSemester(initialValues?.semester ?? "1");
  }, [initialValues]);
  const showYesNoAlert = () => {
    Alert.alert(
      `Delete ${className} ? `, // Title
      "This action is irreversible", // Message
      [
        {
          text: "No", // No button
          style: "cancel",
        },
        {
          text: "Yes", // Yes button
          onPress: async () => {
            const course = await getCourseById(id);

            const updatedClasses = course?.classes?.filter(
              (item) => item.id !== classId,
            );

            if (updatedClasses && course) {
              const grades = updatedClasses.map((item) => {
                return { grade: item.grade, credits: item.credits };
              });
              const gpa = calculateGPA({
                grades,
                maxGPA: course?.type,
              }).toString();
              await updateCourse(id, {
                gpa,
                classes: updatedClasses,
              });
            } else {
              await updateCourse(id, {
                classes: updatedClasses,
              });
            }

            setVisible(false);
          },
        },
      ],
      { cancelable: true }, // Tap outside to dismiss (Android)
    );
  };
  const onFormSubmit = async () => {
    try {
      await onSubmit({ className, credits, grade, year, semester } as Payload);

      if (resetUponCompletion) {
        setClassName("");
        setCredits("3");
        setGrade("A+");
        setYear("1");
        setSemester("1");
      }

      Toast.show({
        type: "success",
        text1: modelText1,
        text2: modalText2,
        visibilityTime: 3000,
        position: "bottom",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Set the first error for the field
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          text2: err.issues[0].message,
          visibilityTime: 3000,
          position: "bottom",
        });
      }
      console.log(err);
    }
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)} // Android back button
    >
      {/* Outer overlay: closes on press */}
      <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
        {/* Inner modal content: stop press propagation */}
        <Pressable style={styles.modal}>
          <Text style={styles.title}>New Class</Text>
          <View
            style={{
              gap: 20,
            }}
          >
            <CustomInput
              label="Name/Code"
              value={className}
              setValue={setClassName}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <CustomInput
                  label="Year"
                  value={year}
                  type="number"
                  setValue={setYear}
                  maxNum={10}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomInput
                  label="Semester"
                  type="number"
                  value={semester}
                  setValue={setSemester}
                  maxNum={10}
                />
              </View>
            </View>

            <CustomInput
              label="Academic Credits"
              value={credits}
              type="number"
              setValue={setCredits}
              maxNum={20}
            />

            <CustomSelect
              label="Grade"
              value={grade}
              onValueChange={setGrade}
              options={[
                { label: "A+", value: "A+" },
                { label: "A", value: "A" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B", value: "B" },
                { label: "B-", value: "B-" },
                { label: "C+", value: "C+" },
                { label: "C", value: "C" },
                { label: "C-", value: "C-" },
                { label: "D+", value: "D+" },
                { label: "C", value: "D" },
                { label: "F", value: "F" },
              ]}
            />
            <View style={{ gap: 10 }}>
              <TouchableOpacity style={styles.button} onPress={onFormSubmit}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
              {includeDelete && (
                <TouchableOpacity
                  style={styles.errorButton}
                  onPress={showYesNoAlert}
                >
                  <Text style={styles.errorButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ClassModal;
