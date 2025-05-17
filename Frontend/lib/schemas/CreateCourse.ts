import { z } from "zod";

export const createCourseSchema = z.object({
  courseCode: z
    .string()
    .min(3, "Course code must be at least 3 characters")
    .max(10, "Course code must be at most 10 characters"),
  name: z.string().min(2, "Course name must be at least 2 characters"),
  departmentId: z.string().min(1, "Please select a department").optional(),
  isOpen: z.boolean().optional(),
  prerequisiteCourseIds: z.array(z.string()).optional(),
  creditHours: z
    .number()
    .min(1, "Credit hours must be at least 1")
    .max(10, "Credit hours must be at most 6"),
  semester: z.number().optional(),
  InstructorId: z.string().optional(),
});
