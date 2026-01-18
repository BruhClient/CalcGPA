import { pickerColor } from "@/config/colors";
import { styles } from "@/config/styles";
import { Picker } from "@react-native-picker/picker";
import { Dispatch, SetStateAction } from "react";
import { Text, View } from "react-native";

type AppSelectProps = {
  label: string;
  options: { label: string; value: string | number }[];
  value: string | number;
  onValueChange: Dispatch<SetStateAction<string | number>>;
  error?: string;
};

export default function CustomSelect({
  label,
  options,
  value,
  error,
  onValueChange,
}: AppSelectProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.label}
      >
        {options.map((opt) => (
          <Picker.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
            color={pickerColor}
          />
        ))}
      </Picker>
    </View>
  );
}
