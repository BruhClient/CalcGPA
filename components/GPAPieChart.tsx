import { COLORS } from "@/config/colors";
import { styles } from "@/config/styles";
import { calculateGPA } from "@/lib/calculate-gpa";
import { Class } from "@/schema/create-class";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const GRADE_COLORS: Record<string, string> = {
  "A+": "#16a34a",
  A: "#22c55e",
  "A-": "#4ade80",

  "B+": "#ca8a04",
  B: "#eab308",
  "B-": "#fde047",

  "C+": "#ea580c",
  C: "#f97316",
  "C-": "#fdba74",

  "D+": "#dc2626",
  D: "#ef4444",
  "D-": "#f87171",

  F: "#7f1d1d",
};

const getGradeColor = (grade: string) => GRADE_COLORS[grade] ?? "#9ca3af";

const GPAPieChart = ({
  classes,
  maxGPA,
}: {
  classes: Class[];
  maxGPA: number;
}) => {
  const isEmpty = classes.length === 0;

  const gpa = useMemo(() => {
    if (isEmpty) return "0";

    const grades = classes.map((item) => ({
      grade: item.grade,
      credits: item.credits,
    }));

    return calculateGPA({ grades, maxGPA }).toString();
  }, [classes, maxGPA, isEmpty]);

  const pieChartData = useMemo(() => {
    if (isEmpty) {
      return [
        {
          value: 1,
          color: COLORS.secondary,
          text: "null",
        },
      ];
    }

    // 🔥 Sum credits per grade
    const gradeCredits: Record<string, number> = {};

    for (const item of classes) {
      if (!item.grade || !item.credits) continue;

      gradeCredits[item.grade] = (gradeCredits[item.grade] ?? 0) + item.credits;
    }

    return Object.entries(gradeCredits).map(([grade, credits]) => ({
      value: credits, // distributed by credits
      text: grade,
      color: getGradeColor(grade),
    }));
  }, [classes, isEmpty]);

  return (
    <View style={{ alignItems: "center", gap: 12 }}>
      <PieChart
        data={pieChartData}
        donut
        strokeWidth={2}
        strokeColor={COLORS.stroke}
        innerRadius={60}
        radius={85}
        centerLabelComponent={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: COLORS.inverse,
            }}
          >
            <Text style={{ ...styles.inverseTitle, fontSize: 28 }}>{gpa}</Text>
            <Text style={styles.secondary}>GPA</Text>
          </View>
        )}
        textColor="#000"
      />

      {!isEmpty && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {pieChartData.map((slice) => (
            <View
              key={slice.text}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                marginBottom: 4,
              }}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: slice.color,
                  borderRadius: 4,
                }}
              />
              <Text style={styles.secondary}>{slice.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default GPAPieChart;
