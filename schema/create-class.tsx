import { z } from "zod";

// Example schema
export const createClassSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty("Enter your class name"),
  grade: z.string().nonempty("Enter your grade"),
  credits: z.number().min(1, { message: "Class must hold more than 1 credit" }),
  year: z.string(),
  semester: z.string(),
});

export type Class = z.infer<typeof createClassSchema>;
