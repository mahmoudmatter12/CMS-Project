import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  departmentId: z.string().min(1, "Please select a department").optional(),
  studentCollageId: z.string().min(3, "Student ID must be at least 3 characters").max(9, "Student ID must be at most 9 characters"),
  level: z.string().min(1, "Please select your academic level"),
  profilePicture: z.string().url("Please provide a valid image URL").optional(),
});