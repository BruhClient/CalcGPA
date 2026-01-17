import SafeScreen from "@/components/SafeScreen";
import { COLORS } from "@/config/colors";
import { toastConfig } from "@/config/toast";
import { CoursesProvider } from "@/hooks/useCourses";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const [loaded] = useFonts({
    Jua: require("../assets/fonts/Jua-Regular.ttf"),
  });

  if (!loaded) return null;
  return (
    <SafeScreen>
      <CoursesProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: COLORS.background,
            },
          }}
        />
        <Toast config={toastConfig} />
      </CoursesProvider>
      <StatusBar style="dark" />
    </SafeScreen>
  );
}
