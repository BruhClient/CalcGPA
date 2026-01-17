import { styles } from "@/config/styles";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TextInput, View } from "react-native";

const CustomInput = ({
  label,
  value,
  setValue,
  type,
  maxNum,
}: {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type?: string;
  maxNum?: number;
}) => {
  const handleChange = (text: string) => {
    // remove non-digits
    const digits = text.replace(/[^0-9]/g, "");

    if (digits === "") {
      setValue("");
      return;
    }

    const num = Number(digits);

    // enforce range
    if (num >= 1 && num <= maxNum!) {
      setValue(digits);
    }
  };
  return (
    <View
      style={{
        gap: 5,
      }}
    >
      <Text style={styles.label}>{label}</Text>
      {type === "number" ? (
        <TextInput
          value={value}
          returnKeyType="done"
          keyboardType="number-pad"
          inputMode="numeric"
          style={styles.input}
          onChangeText={handleChange}
          maxLength={maxNum?.toString().length}
        />
      ) : (
        <TextInput style={styles.input} value={value} onChangeText={setValue} />
      )}
    </View>
  );
};

export default CustomInput;
