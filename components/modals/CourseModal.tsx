import { styles } from "@/config/styles";
import { useCourses } from "@/hooks/useCourses";
import { useRouter } from "expo-router";
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
  course: string;
  institution: string;
  type: number;
};
const CourseModal = ({
  visible,
  setVisible,
  onSubmit,
  title,
  includeDelete = false,
  id,
  buttonText,
  modalText1 = "Course Created! ",
  modalText2 = "You can start adding classes and recording your GPA",
  initialValues,
  resetUponCompletion = true,
}: {
  visible: boolean;
  title: string;
  modalText1?: string;
  modalText2?: string;
  includeDelete?: boolean;
  id?: string;
  buttonText: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onSubmit: ({ course, institution, type }: Payload) => {};
  initialValues?: Payload;
  resetUponCompletion?: boolean;
}) => {
  const [course, setCourse] = useState(initialValues?.course ?? "");

  const [institution, setInstitution] = useState(
    initialValues?.institution ?? "",
  );
  const router = useRouter();
  const [type, setType] = useState<number | string>(initialValues?.type ?? 5);
  const { deleteCourse } = useCourses();
  useEffect(() => {
    if (initialValues) {
      setCourse(initialValues.course);
      setInstitution(initialValues.institution);
      setType(initialValues.type);
    }
  }, [visible]);
  const showYesNoAlert = () => {
    Alert.alert(
      `Delete ${course}`, // Title
      "This action is irreversible", // Message
      [
        {
          text: "No", // No button
          style: "cancel",
        },
        {
          text: "Yes", // Yes button
          onPress: async () => {
            await deleteCourse(id!);
            router.back();
          },
        },
      ],
      { cancelable: true }, // Tap outside to dismiss (Android)
    );
  };

  const onFormSubmit = async () => {
    try {
      await onSubmit({ course, institution, type } as Payload);

      if (resetUponCompletion) {
        setCourse("");
        setInstitution("");
        setType(5);
      }

      Toast.show({
        type: "success",
        text1: modalText1,
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
          <Text style={styles.title}>{title}</Text>
          <View
            style={{
              gap: 20,
            }}
          >
            <CustomInput
              label="Course Name"
              value={course}
              setValue={setCourse}
            />
            <CustomInput
              label="Institution"
              value={institution}
              setValue={setInstitution}
            />
            <CustomSelect
              label="Max GPA"
              value={type}
              onValueChange={setType}
              options={[
                { label: "4", value: 4 },
                { label: "5", value: 5 },
              ]}
            />

            <View style={{ gap: 8 }}>
              <TouchableOpacity style={styles.button} onPress={onFormSubmit}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>

              {id && includeDelete && (
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

export default CourseModal;
