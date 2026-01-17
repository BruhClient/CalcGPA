import { COLORS } from "@/config/colors";
import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export default function SafeScreen({ children, style }: SafeScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: COLORS.background,
        ...style,
      }}
    >
      {children}
    </View>
  );
}
