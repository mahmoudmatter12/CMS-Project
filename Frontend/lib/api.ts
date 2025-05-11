import {
    mockCourses,
    mockAssignments,
    mockSubmissions,
    mockAnnouncements,
    mockNotifications,
    type Course,
    type Assignment,
    type Submission,
    type Announcement,
    type Notification,
  } from "./mock-data"
  
  // Simulate API calls with delays
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
  
  // Generic error handling
  const handleError = (error: unknown) => {
    console.error("API Error:", error)
    throw error instanceof Error ? error : new Error("An unknown error occurred")
  }
  
  // Users API
  export const usersApi = {
    // Get all users
    // getUsers: async (): Promise<User[]> => {
    //   try {
    //     await delay(500)
    //     return [...mockUsers]
    //   } catch (error) {
    //     return handleError(error)
    //   }
    // },
  
    // Get user by ID
    // getUserById: async (userId: string): Promise<User> => {
    //   try {
    //     await delay(300)
    //     const user = mockUsers.find((u) => u.id === userId)
    //     if (!user) throw new Error("User not found")
    //     return { ...user }
    //   } catch (error) {
    //     return handleError(error)
    //   }
    // },
  
    // Update user
    // updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
    //   try {
    //     await delay(700)
    //     const userIndex = mockUsers.findIndex((u) => u.id === userId)
    //     if (userIndex === -1) throw new Error("User not found")
  
    //     // In a real app, this would update the database
    //     // Here we're just returning the updated user
    //     return { ...mockUsers[userIndex], ...userData }
    //   } catch (error) {
    //     return handleError(error)
    //   }
    // },
  }
  
  // Courses API
  export const coursesApi = {
    // Get all courses
    getCourses: async (): Promise<Course[]> => {
      try {
        await delay(600)
        return [...mockCourses]
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get course by ID
    getCourseById: async (courseId: string): Promise<Course> => {
      try {
        await delay(400)
        const course = mockCourses.find((c) => c.id === courseId)
        if (!course) throw new Error("Course not found")
        return { ...course }
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get courses by teacher ID
    getCoursesByTeacher: async (teacherId: string): Promise<Course[]> => {
      try {
        await delay(500)
        return mockCourses.filter((c) => c.teacherId === teacherId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get courses by TA ID
    getCoursesByTA: async (taId: string): Promise<Course[]> => {
      try {
        await delay(500)
        return mockCourses.filter((c) => c.taIds.includes(taId))
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get courses by student ID
    getCoursesByStudent: async (studentId: string): Promise<Course[]> => {
      try {
        await delay(500)
        return mockCourses.filter((c) => c.enrolledStudents.includes(studentId))
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Create course
    createCourse: async (courseData: Partial<Course>): Promise<Course> => {
      try {
        await delay(800)
        // In a real app, this would add to the database
        // Here we're just returning a mock course with the provided data
        const newCourse: Course = {
          id: `c${mockCourses.length + 1}`,
          code: courseData.code || "NEW101",
          name: courseData.name || "New Course",
          description: courseData.description || "",
          department: courseData.department || "",
          credits: courseData.credits || 3,
          teacherId: courseData.teacherId || "",
          taIds: courseData.taIds || [],
          semester: courseData.semester || "Fall",
          year: courseData.year || new Date().getFullYear(),
          enrolledStudents: courseData.enrolledStudents || [],
          schedule: courseData.schedule || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return newCourse
      } catch (error) {
        return handleError(error)
      }
    },
  }
  
  // Assignments API
  export const assignmentsApi = {
    // Get all assignments
    getAssignments: async (): Promise<Assignment[]> => {
      try {
        await delay(600)
        return [...mockAssignments]
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get assignment by ID
    getAssignmentById: async (assignmentId: string): Promise<Assignment> => {
      try {
        await delay(400)
        const assignment = mockAssignments.find((a) => a.id === assignmentId)
        if (!assignment) throw new Error("Assignment not found")
        return { ...assignment }
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get assignments by course ID
    getAssignmentsByCourse: async (courseId: string): Promise<Assignment[]> => {
      try {
        await delay(500)
        return mockAssignments.filter((a) => a.courseId === courseId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Create assignment
    createAssignment: async (assignmentData: Partial<Assignment>): Promise<Assignment> => {
      try {
        await delay(800)
        const newAssignment: Assignment = {
          id: `a${mockAssignments.length + 1}`,
          courseId: assignmentData.courseId || "",
          title: assignmentData.title || "New Assignment",
          description: assignmentData.description || "",
          dueDate: assignmentData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalPoints: assignmentData.totalPoints || 100,
          attachments: assignmentData.attachments || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return newAssignment
      } catch (error) {
        return handleError(error)
      }
    },
  }
  
  // Submissions API
  export const submissionsApi = {
    // Get submission by ID
    getSubmissionById: async (submissionId: string): Promise<Submission> => {
      try {
        await delay(400)
        const submission = mockSubmissions.find((s) => s.id === submissionId)
        if (!submission) throw new Error("Submission not found")
        return { ...submission }
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get submissions by assignment ID
    getSubmissionsByAssignment: async (assignmentId: string): Promise<Submission[]> => {
      try {
        await delay(500)
        return mockSubmissions.filter((s) => s.assignmentId === assignmentId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get submissions by student ID
    getSubmissionsByStudent: async (studentId: string): Promise<Submission[]> => {
      try {
        await delay(500)
        return mockSubmissions.filter((s) => s.studentId === studentId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Create submission
    createSubmission: async (submissionData: Partial<Submission>): Promise<Submission> => {
      try {
        await delay(800)
        const newSubmission: Submission = {
          id: `s${mockSubmissions.length + 1}`,
          assignmentId: submissionData.assignmentId || "",
          studentId: submissionData.studentId || "",
          submissionDate: new Date().toISOString(),
          content: submissionData.content || "",
          attachments: submissionData.attachments || [],
          status: "SUBMITTED",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return newSubmission
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Grade submission
    gradeSubmission: async (submissionId: string, grade: number, feedback?: string): Promise<Submission> => {
      try {
        await delay(600)
        const submission = mockSubmissions.find((s) => s.id === submissionId)
        if (!submission) throw new Error("Submission not found")
  
        return {
          ...submission,
          grade,
          feedback,
          status: "GRADED",
          updatedAt: new Date().toISOString(),
        }
      } catch (error) {
        return handleError(error)
      }
    },
  }
  
  // Announcements API
  export const announcementsApi = {
    // Get all announcements
    getAnnouncements: async (): Promise<Announcement[]> => {
      try {
        await delay(500)
        return [...mockAnnouncements]
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get global announcements
    getGlobalAnnouncements: async (): Promise<Announcement[]> => {
      try {
        await delay(400)
        return mockAnnouncements.filter((a) => !a.courseId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Get announcements by course ID
    getAnnouncementsByCourse: async (courseId: string): Promise<Announcement[]> => {
      try {
        await delay(400)
        return mockAnnouncements.filter((a) => a.courseId === courseId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Create announcement
    createAnnouncement: async (announcementData: Partial<Announcement>): Promise<Announcement> => {
      try {
        await delay(700)
        const newAnnouncement: Announcement = {
          id: `an${mockAnnouncements.length + 1}`,
          courseId: announcementData.courseId,
          title: announcementData.title || "New Announcement",
          content: announcementData.content || "",
          authorId: announcementData.authorId || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return newAnnouncement
      } catch (error) {
        return handleError(error)
      }
    },
  }
  
  // Notifications API
  export const notificationsApi = {
    // Get notifications by user ID
    getNotificationsByUser: async (userId: string): Promise<Notification[]> => {
      try {
        await delay(400)
        return mockNotifications.filter((n) => n.userId === userId)
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Mark notification as read
    markNotificationAsRead: async (notificationId: string): Promise<Notification> => {
      try {
        await delay(300)
        const notification = mockNotifications.find((n) => n.id === notificationId)
        if (!notification) throw new Error("Notification not found")
  
        return {
          ...notification,
          read: true,
          updatedAt: new Date().toISOString(),
        }
      } catch (error) {
        return handleError(error)
      }
    },
  
    // Create notification
    createNotification: async (notificationData: Partial<Notification>): Promise<Notification> => {
      try {
        await delay(500)
        const newNotification: Notification = {
          id: `n${mockNotifications.length + 1}`,
          userId: notificationData.userId || "",
          title: notificationData.title || "",
          message: notificationData.message || "",
          type: notificationData.type || "INFO",
          read: false,
          link: notificationData.link,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return newNotification
      } catch (error) {
        return handleError(error)
      }
    },
  }
  