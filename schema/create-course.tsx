import { z } from "zod";
import { createClassSchema } from "./create-class";

// Example schema
export const createCourseSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Enter your course"),
  institution: z.string().nonempty("Enter your institution"),
  type: z.number(),
  classes: z.array(createClassSchema).nullable(),
  gpa: z.string().nullish(),
});

export type Course = z.infer<typeof createCourseSchema>;
