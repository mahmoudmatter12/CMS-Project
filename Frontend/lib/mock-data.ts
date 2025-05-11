// User Types

// Course Types
export interface Course {
  id: string
  code: string
  name: string
  description: string
  department: string
  credits: number
  teacherId: string
  taIds: string[]
  semester: string
  year: number
  enrolledStudents: string[]
  schedule: {
    day: string
    startTime: string
    endTime: string
    location: string
  }[]
  createdAt: string
  updatedAt: string
}

// Assignment Types
export interface Assignment {
  id: string
  courseId: string
  title: string
  description: string
  dueDate: string
  totalPoints: number
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

// Submission Types
export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  submissionDate: string
  content?: string
  attachments?: string[]
  grade?: number
  feedback?: string
  status: "SUBMITTED" | "GRADED" | "LATE" | "MISSING"
  createdAt: string
  updatedAt: string
}

// Quiz Types
export interface Quiz {
  id: string
  courseId: string
  title: string
  description: string
  startDate: string
  endDate: string
  duration: number // in minutes
  totalPoints: number
  questions: QuizQuestion[]
  createdAt: string
  updatedAt: string
}

export interface QuizQuestion {
  id: string
  quizId: string
  question: string
  type: "MULTIPLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER"
  options?: string[]
  correctAnswer: string | string[]
  points: number
}

export interface QuizAttempt {
  id: string
  quizId: string
  studentId: string
  startTime: string
  endTime?: string
  score?: number
  answers: {
    questionId: string
    answer: string | string[]
  }[]
  status: "IN_PROGRESS" | "COMPLETED" | "GRADED"
  createdAt: string
  updatedAt: string
}

// Announcement Types
export interface Announcement {
  id: string
  courseId?: string // If null, it's a global announcement
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

// Attendance Types
export interface Attendance {
  id: string
  courseId: string
  date: string
  records: {
    studentId: string
    status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED"
    notes?: string
  }[]
  createdAt: string
  updatedAt: string
}

// Department Types
export interface Department {
  id: string
  name: string
  code: string
  headId?: string // Reference to a User with role ADMIN or TEACHER
  description?: string
  createdAt: string
  updatedAt: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR"
  read: boolean
  link?: string
  createdAt: string
  updatedAt: string
}

// Generate mock data
// export const mockUsers: User[] = [
//   {
//     id: "u1",
//     email: "admin@college.edu",
//     fname: "Admin",
//     lname: "User",
//     role: "ADMIN",
//     department: "Administration",
//     phone: "123-456-7890",
//     createdAt: "2023-01-01T00:00:00Z",
//     updatedAt: "2023-01-01T00:00:00Z",
//   },
//   {
//     id: "u2",
//     email: "teacher@college.edu",
//     fname: "John",
//     lname: "Smith",
//     role: "TEACHER",
//     department: "Computer Science",
//     phone: "123-456-7891",
//     bio: "Professor of Computer Science with 15 years of experience",
//     createdAt: "2023-01-02T00:00:00Z",
//     updatedAt: "2023-01-02T00:00:00Z",
//   },
//   {
//     id: "u3",
//     email: "ta@college.edu",
//     fname: "Jane",
//     lname: "Doe",
//     role: "TA",
//     department: "Computer Science",
//     phone: "123-456-7892",
//     bio: "Graduate student in Computer Science",
//     createdAt: "2023-01-03T00:00:00Z",
//     updatedAt: "2023-01-03T00:00:00Z",
//   },
//   {
//     id: "u4",
//     email: "student1@college.edu",
//     fname: "Alice",
//     lname: "Johnson",
//     role: "STUDENT",
//     department: "Computer Science",
//     enrollmentDate: "2022-09-01T00:00:00Z",
//     graduationYear: "2026",
//     gpa: 3.8,
//     phone: "123-456-7893",
//     createdAt: "2023-01-04T00:00:00Z",
//     updatedAt: "2023-01-04T00:00:00Z",
//   },
//   {
//     id: "u5",
//     email: "student2@college.edu",
//     fname: "Bob",
//     lname: "Brown",
//     role: "STUDENT",
//     department: "Computer Science",
//     enrollmentDate: "2022-09-01T00:00:00Z",
//     graduationYear: "2026",
//     gpa: 3.5,
//     phone: "123-456-7894",
//     createdAt: "2023-01-05T00:00:00Z",
//     updatedAt: "2023-01-05T00:00:00Z",
//   },
//   {
//     id: "u6",
//     email: "mahmoodgamal045@gmail.com",
//     fname: "Mahmoud",
//     lname: "Matter",
//     role: "ADMIN",
//     department: "Administration",
//     phone: "123-456-7895",
//     createdAt: "2023-01-06T00:00:00Z",
//     updatedAt: "2023-01-06T00:00:00Z",
//   },
// ]

export const mockCourses: Course[] = [
  {
    id: "c1",
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "An introductory course to computer science and programming",
    department: "Computer Science",
    credits: 3,
    teacherId: "u2",
    taIds: ["u3"],
    semester: "Fall",
    year: 2023,
    enrolledStudents: ["u4", "u5"],
    schedule: [
      {
        day: "Monday",
        startTime: "10:00",
        endTime: "11:30",
        location: "Room 101",
      },
      {
        day: "Wednesday",
        startTime: "10:00",
        endTime: "11:30",
        location: "Room 101",
      },
    ],
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
  {
    id: "c2",
    code: "CS201",
    name: "Data Structures and Algorithms",
    description: "A comprehensive study of data structures and algorithms",
    department: "Computer Science",
    credits: 4,
    teacherId: "u2",
    taIds: ["u3"],
    semester: "Fall",
    year: 2023,
    enrolledStudents: ["u4", "u5"],
    schedule: [
      {
        day: "Tuesday",
        startTime: "13:00",
        endTime: "14:30",
        location: "Room 102",
      },
      {
        day: "Thursday",
        startTime: "13:00",
        endTime: "14:30",
        location: "Room 102",
      },
    ],
    createdAt: "2023-01-11T00:00:00Z",
    updatedAt: "2023-01-11T00:00:00Z",
  },
  {
    id: "c3",
    code: "CS301",
    name: "Database Systems",
    description: "Introduction to database design and management",
    department: "Computer Science",
    credits: 3,
    teacherId: "u2",
    taIds: ["u3"],
    semester: "Spring",
    year: 2024,
    enrolledStudents: ["u4"],
    schedule: [
      {
        day: "Monday",
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 103",
      },
      {
        day: "Wednesday",
        startTime: "14:00",
        endTime: "15:30",
        location: "Room 103",
      },
    ],
    createdAt: "2023-01-12T00:00:00Z",
    updatedAt: "2023-01-12T00:00:00Z",
  },
]

export const mockAssignments: Assignment[] = [
  {
    id: "a1",
    courseId: "c1",
    title: "Programming Assignment 1",
    description: "Write a program to calculate factorial of a number",
    dueDate: "2023-09-15T23:59:59Z",
    totalPoints: 100,
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "a2",
    courseId: "c1",
    title: "Programming Assignment 2",
    description: "Implement a simple calculator using functions",
    dueDate: "2023-09-30T23:59:59Z",
    totalPoints: 100,
    createdAt: "2023-09-16T00:00:00Z",
    updatedAt: "2023-09-16T00:00:00Z",
  },
  {
    id: "a3",
    courseId: "c2",
    title: "Implement a Linked List",
    description: "Create a linked list data structure with basic operations",
    dueDate: "2023-10-15T23:59:59Z",
    totalPoints: 150,
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2023-10-01T00:00:00Z",
  },
]

export const mockSubmissions: Submission[] = [
  {
    id: "s1",
    assignmentId: "a1",
    studentId: "u4",
    submissionDate: "2023-09-14T20:30:00Z",
    content: "Submission content for assignment 1",
    grade: 90,
    feedback: "Great work! Just a few minor issues.",
    status: "GRADED",
    createdAt: "2023-09-14T20:30:00Z",
    updatedAt: "2023-09-16T10:00:00Z",
  },
  {
    id: "s2",
    assignmentId: "a1",
    studentId: "u5",
    submissionDate: "2023-09-15T22:45:00Z",
    content: "Submission content for assignment 1",
    grade: 85,
    feedback: "Good job, but could improve code organization.",
    status: "GRADED",
    createdAt: "2023-09-15T22:45:00Z",
    updatedAt: "2023-09-16T10:15:00Z",
  },
  {
    id: "s3",
    assignmentId: "a2",
    studentId: "u4",
    submissionDate: "2023-09-28T18:20:00Z",
    content: "Submission content for assignment 2",
    status: "SUBMITTED",
    createdAt: "2023-09-28T18:20:00Z",
    updatedAt: "2023-09-28T18:20:00Z",
  },
]

export const mockQuizzes: Quiz[] = [
  {
    id: "q1",
    courseId: "c1",
    title: "Quiz 1: Programming Basics",
    description: "Test your knowledge of basic programming concepts",
    startDate: "2023-09-20T10:00:00Z",
    endDate: "2023-09-20T11:00:00Z",
    duration: 60,
    totalPoints: 50,
    questions: [
      {
        id: "qq1",
        quizId: "q1",
        question: "What is a variable?",
        type: "MULTIPLE_CHOICE",
        options: [
          "A container for storing data values",
          "A mathematical operation",
          "A programming language",
          "A type of loop",
        ],
        correctAnswer: "A container for storing data values",
        points: 10,
      },
      {
        id: "qq2",
        quizId: "q1",
        question: "Is Python a compiled language?",
        type: "TRUE_FALSE",
        correctAnswer: "false",
        points: 10,
      },
      {
        id: "qq3",
        quizId: "q1",
        question: "What does the acronym 'IDE' stand for?",
        type: "SHORT_ANSWER",
        correctAnswer: "Integrated Development Environment",
        points: 10,
      },
    ],
    createdAt: "2023-09-10T00:00:00Z",
    updatedAt: "2023-09-10T00:00:00Z",
  },
]

export const mockQuizAttempts: QuizAttempt[] = [
  {
    id: "qa1",
    quizId: "q1",
    studentId: "u4",
    startTime: "2023-09-20T10:05:00Z",
    endTime: "2023-09-20T10:45:00Z",
    score: 40,
    answers: [
      {
        questionId: "qq1",
        answer: "A container for storing data values",
      },
      {
        questionId: "qq2",
        answer: "false",
      },
      {
        questionId: "qq3",
        answer: "Integrated Development Environment",
      },
    ],
    status: "GRADED",
    createdAt: "2023-09-20T10:05:00Z",
    updatedAt: "2023-09-20T10:45:00Z",
  },
  {
    id: "qa2",
    quizId: "q1",
    studentId: "u5",
    startTime: "2023-09-20T10:10:00Z",
    endTime: "2023-09-20T10:50:00Z",
    score: 30,
    answers: [
      {
        questionId: "qq1",
        answer: "A container for storing data values",
      },
      {
        questionId: "qq2",
        answer: "true",
      },
      {
        questionId: "qq3",
        answer: "Integrated Developer Environment",
      },
    ],
    status: "GRADED",
    createdAt: "2023-09-20T10:10:00Z",
    updatedAt: "2023-09-20T10:50:00Z",
  },
]

export const mockAnnouncements: Announcement[] = [
  {
    id: "an1",
    title: "Welcome to the Fall Semester",
    content: "Welcome to the Fall 2023 semester! We're excited to have you all back on campus.",
    authorId: "u1",
    createdAt: "2023-08-25T00:00:00Z",
    updatedAt: "2023-08-25T00:00:00Z",
  },
  {
    id: "an2",
    courseId: "c1",
    title: "Assignment 1 Posted",
    content: "The first programming assignment has been posted. Please check the course page for details.",
    authorId: "u2",
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "an3",
    courseId: "c2",
    title: "Office Hours Change",
    content: "My office hours will be moved to Thursday 2-4pm starting next week.",
    authorId: "u2",
    createdAt: "2023-09-05T00:00:00Z",
    updatedAt: "2023-09-05T00:00:00Z",
  },
]

export const mockAttendance: Attendance[] = [
  {
    id: "at1",
    courseId: "c1",
    date: "2023-09-04T10:00:00Z",
    records: [
      {
        studentId: "u4",
        status: "PRESENT",
      },
      {
        studentId: "u5",
        status: "PRESENT",
      },
    ],
    createdAt: "2023-09-04T11:30:00Z",
    updatedAt: "2023-09-04T11:30:00Z",
  },
  {
    id: "at2",
    courseId: "c1",
    date: "2023-09-06T10:00:00Z",
    records: [
      {
        studentId: "u4",
        status: "PRESENT",
      },
      {
        studentId: "u5",
        status: "ABSENT",
        notes: "Sick leave",
      },
    ],
    createdAt: "2023-09-06T11:30:00Z",
    updatedAt: "2023-09-06T11:30:00Z",
  },
]

export const mockDepartments: Department[] = [
  {
    id: "d1",
    name: "Computer Science",
    code: "CS",
    headId: "u2",
    description: "Department of Computer Science and Engineering",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "d2",
    name: "Mathematics",
    code: "MATH",
    description: "Department of Mathematics",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "d3",
    name: "Physics",
    code: "PHYS",
    description: "Department of Physics",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "u4",
    title: "New Assignment",
    message: "A new assignment has been posted in CS101",
    type: "INFO",
    read: false,
    link: "/courses/c1/assignments/a1",
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "n2",
    userId: "u4",
    title: "Assignment Graded",
    message: "Your submission for Programming Assignment 1 has been graded",
    type: "SUCCESS",
    read: false,
    link: "/courses/c1/assignments/a1/submissions/s1",
    createdAt: "2023-09-16T10:00:00Z",
    updatedAt: "2023-09-16T10:00:00Z",
  },
  {
    id: "n3",
    userId: "u2",
    title: "New Submission",
    message: "Alice Johnson has submitted Programming Assignment 2",
    type: "INFO",
    read: true,
    link: "/courses/c1/assignments/a2/submissions/s3",
    createdAt: "2023-09-28T18:20:00Z",
    updatedAt: "2023-09-28T18:20:00Z",
  },
]
