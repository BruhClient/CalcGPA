import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

const FONT = "Jua";

export const styles = StyleSheet.create({
  title: {
    fontFamily: FONT,
    fontSize: 20,
    color: COLORS.text,
  },
  inverseTitle: {
    fontFamily: FONT,
    fontSize: 20,
    color: COLORS.inverseText,
  },
  subTitle: {
    fontFamily: FONT,
    fontSize: 18,
    color: COLORS.text,
  },
  secondary: {
    fontSize: 15,
    fontFamily: FONT,
    color: COLORS.secondary,
  },

  label: {
    fontFamily: FONT,
    fontSize: 15,
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    borderColor: COLORS.stroke,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButtonInactive: {
    borderWidth: 2,
    borderColor: COLORS.stroke,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  filterButtonActive: {
    backgroundColor: COLORS.stroke,
    borderColor: COLORS.stroke,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: FONT,
    color: COLORS.text,
  },
  activeButtonText: {
    fontSize: 15,
    fontFamily: FONT,
    color: COLORS.inverse,
  },
  errorButton: {
    backgroundColor: COLORS.error,
    borderRadius: 10,
    borderColor: COLORS.stroke,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  errorButtonText: {
    fontSize: 17,
    fontFamily: FONT,
    color: COLORS.inverse,
  },
  outlineButton: {
    height: 70,
    borderWidth: 2,
    borderColor: COLORS.stroke,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  input: {
    borderBottomColor: COLORS.input,
    borderBottomWidth: 2,
    fontFamily: FONT,
    fontSize: 15,
    color: COLORS.text,

    paddingLeft: 3,
    paddingVertical: 5,
  },

  overlay: {
    flex: 1,
    backgroundColor: COLORS.modal_overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  errorToast: {
    borderLeftColor: COLORS.error,
    backgroundColor: COLORS.background,
    zIndex: 9999,
  },
  successToast: {
    borderLeftColor: COLORS.success,
    backgroundColor: COLORS.background,
    zIndex: 9999,
  },
  errorText: {
    fontFamily: FONT,
    fontSize: 15,
    color: COLORS.text,
  },
  successText: {
    fontFamily: FONT,
    fontSize: 15,
    color: COLORS.text,
  },
  courseButton: {
    borderWidth: 2,
    padding: 15,
    borderColor: COLORS.stroke,

    gap: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modal: {
    backgroundColor: COLORS.background,
    padding: 20,
    gap: 15,
    borderRadius: 12,
    width: "85%",
  },
});
