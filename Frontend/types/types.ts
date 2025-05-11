export type UserRole = "Student" | "Admin" | "Teacher";

export interface User {
  id: string;
  email: string;
  fullname: string;
  departmentId: string;
  depName: string;
  profilePicture: string;
  clerkId: string;
  studentCollageId: string;
  isBoarded: boolean;
  role: UserRole;
  CGPA: number;
  Level: string;
}

// export interface Course{
  
// }