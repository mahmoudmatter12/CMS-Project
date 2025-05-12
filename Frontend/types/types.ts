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
  cgpa: number;
  level: string;
}

export enum userLeve {
  level_1 = "Level 1",
  level_2 = "Level 2",
  level_3 = "Level 3",
  level_4 = "Level 4",
}

export enum UserRole {
  Student = "Student",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
  Teacher = "Teacher",  
}

export interface Course{
  id: string;
  name: string;
  creditHours: number;
  semester: number;
  isOpen: boolean;
  depName: string;
  departmentId: string;
  prerequisiteCourses: string[];
  prerequisiteCourseIds: string[];
  courseCode: string;
}

export interface Department {
  id: string;
  name: string;
}

// export interface Course{
  
// }