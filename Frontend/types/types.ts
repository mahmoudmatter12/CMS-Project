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

export interface Course {
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

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  attendees: number;
  description: string;
  coverImage: string;
  images: string[];
}
export interface Department {
  id: string;
  name: string;
}
export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number;
  passingMarks: number;
  isActive: boolean;
  startDate: Date | null;
  endDate: Date | null;
  totalMarks: number;
  totalQuestions: number;
  creatorName: string;
  courseName: string;
  myProperty?: number; // Optional property
  questions: Question[];
  MaxAttempts: number;
}

export interface Question {
  questionText: string;
  type: QuestionType;
  answers: string[];
  correctAnswerIndex: number | string;
  marks: number;
  hint?: string;
  explanation?: string;
  imageUrl?: string;
  tags?: string[];
}

export enum QuestionType {
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  TRUE_FALSE = "TRUE_FALSE",
  SHORT_ANSWER = "SHORT_ANSWER",
}
