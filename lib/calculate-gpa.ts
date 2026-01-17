export type GradeWithCredits = {
  grade: string;
  credits: number;
};

/**
 * Grade → points mapping for 4.0 scale
 */
export const GRADE_POINTS_4: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,

  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,

  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,

  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,

  F: 0.0,
};

/**
 * Grade → points mapping for 5.0 scale (NTU-style)
 */
export const GRADE_POINTS_5: Record<string, number> = {
  "A+": 5.0,
  A: 5.0,
  "A-": 4.5,

  "B+": 4.0,
  B: 3.5,
  "B-": 3.0,

  "C+": 2.5,
  C: 2.0,
  "C-": 1.5,

  "D+": 1.0,
  D: 0.5,

  F: 0.0,
};

/**
 * Credit-weighted GPA calculation
 */
export const calculateGPA = ({
  grades,
  maxGPA,
}: {
  grades: GradeWithCredits[];
  maxGPA: number;
}): number => {
  if (!grades.length) return 0;

  const gradePoints = maxGPA === 4 ? GRADE_POINTS_4 : GRADE_POINTS_5;

  let totalPoints = 0;
  let totalCredits = 0;

  for (const { grade, credits } of grades) {
    const points = gradePoints[grade];
    if (points === undefined || credits <= 0) continue;

    totalPoints += points * credits;
    totalCredits += credits;
  }

  if (totalCredits === 0) return 0;

  return Number((totalPoints / totalCredits).toFixed(2));
};
