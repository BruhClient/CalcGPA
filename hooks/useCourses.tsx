import { Course } from "@/schema/create-course";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CoursesContextType = {
  courses: Course[];
  loading: boolean;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseById: (id: string) => Course | null;
  reload: () => Promise<void>;
};

const CoursesContext = createContext<CoursesContextType | null>(null);

const STORAGE_KEY = "courses";

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // READ
  const loadCourses = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      setCourses(stored ? JSON.parse(stored) : []);
    } finally {
      setLoading(false);
    }
  }, []);

  // CREATE
  const addCourse = useCallback(
    async (course: Course) => {
      const updated = [...courses, course];
      setCourses(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [courses],
  );

  // UPDATE
  const updateCourse = useCallback(
    async (id: string, updates: Partial<Course>) => {
      const updated = courses.map((c) =>
        c.id === id ? { ...c, ...updates } : c,
      );

      setCourses(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [courses],
  );

  // DELETE
  const deleteCourse = useCallback(
    async (id: string) => {
      const updated = courses.filter((c) => c.id !== id);
      setCourses(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },
    [courses],
  );

  // READ (single)

  const getCourseById = useCallback(
    (id: string) => courses.find((c) => c.id === id) ?? null,
    [courses],
  );

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        loading,
        addCourse,
        updateCourse,
        deleteCourse,
        getCourseById,
        reload: loadCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CoursesContext);

  if (!context) {
    throw new Error("useCourses must be used within CoursesProvider");
  }

  return context;
}
