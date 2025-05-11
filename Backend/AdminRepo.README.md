# Admin Repository Documentation

This interface provides administrative access to users, enrollments, courses, and departments in the College Management System.

## Table of Contents
- [User Methods](#user-methods)
- [Enrollment Methods](#enrollment-methods)
- [Course Methods](#course-methods)
- [Department Methods](#department-methods)
- [Combined Query Methods](#combined-query-methods)

---

## User Methods

### `GetAllUsersAsync()`
- **Description**: Retrieves all users in the system.
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: A collection of all user entities.

### `GetUserByIdAsync(Guid id)`
- **Description**: Gets a single user by their unique ID.
- **Parameters**:
  - `id`: GUID of the user
- **Return Type**: `Task<T?>`
- **Returns**: The user entity or `null` if not found.

### `GetUserByEmailAsync(string email)`
- **Description**: Finds a user by their email address.
- **Parameters**:
  - `email`: User's email (case-sensitive)
- **Return Type**: `Task<T?>`
- **Returns**: The user entity or `null`.

### `GetUsersByNameAsync(string name)`
- **Description**: Searches users by name (partial match).
- **Parameters**:
  - `name`: Full or partial name to search
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: All users matching the name criteria.

### `GetUsersByRoleAsync(UserRole role)`
- **Description**: Gets all users with a specific role.
- **Parameters**:
  - `role`: Enum value (`UserRole.Student`, `UserRole.Teacher`, etc.)
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: Users filtered by role.

### `GetUsersByCourseAsync(Guid courseId)`
- **Description**: Retrieves all users enrolled in a specific course.
- **Parameters**:
  - `courseId`: GUID of the course
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: Users enrolled in the specified course.

### `GetUsersWithRolesAsync()`
- **Description**: Gets all users with their role information.
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: Users with populated role data (e.g., `User.Role` property).

---

## Enrollment Methods

### `GetEnrollmentsByUserIdAsync(Guid userId)`
- **Description**: Gets all enrollments for a specific user.
- **Parameters**:
  - `userId`: GUID of the user
- **Return Type**: `Task<IEnumerable<UserEnrollments>>`
- **Returns**: All enrollment records for the user.

### `GetUsersByEnrollmentIdAsync(Guid enrollmentId)`
- **Description**: Gets users associated with a specific enrollment record.
- **Parameters**:
  - `enrollmentId`: GUID of the enrollment
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: Users linked to the enrollment.

### `GetAllEnrollmentsAsync()`
- **Description**: Retrieves all enrollment records in the system.
- **Return Type**: `Task<IEnumerable<UserEnrollments>>`
- **Returns**: Complete collection of enrollments.

### `GetEnrollmentByIdAsync(Guid id)`
- **Description**: Gets a single enrollment by ID.
- **Parameters**:
  - `id`: GUID of the enrollment
- **Return Type**: `Task<UserEnrollments?>`
- **Returns**: The enrollment record or `null`.

---

## Course Methods

### `GetAllCoursesAsync()`
- **Description**: Retrieves all courses in the system.
- **Return Type**: `Task<IEnumerable<Course>>`
- **Returns**: Complete course catalog.

### `GetCourseByIdAsync(Guid id)`
- **Description**: Gets a course by its unique ID.
- **Parameters**:
  - `id`: GUID of the course
- **Return Type**: `Task<Course?>`
- **Returns**: The course entity or `null`.

### `GetCoursesByNameAsync(string name)`
- **Description**: Searches courses by name (partial match).
- **Parameters**:
  - `name`: Course name or partial name
- **Return Type**: `Task<IEnumerable<Course>>`
- **Returns**: Matching courses.

### `GetCoursesByDepartmentAsync(Guid departmentId)`
- **Description**: Gets all courses under a department.
- **Parameters**:
  - `departmentId`: GUID of the department
- **Return Type**: `Task<IEnumerable<Course>>`
- **Returns**: Courses filtered by department.

### `ToggleCourseStatusAsync(Guid courseId)`
- **Description**: Activates/deactivates a course.
- **Parameters**:
  - `courseId`: GUID of the course
- **Return Type**: `Task<Course?>`
- **Returns**: The updated course entity or `null` if failed.

---

## Department Methods

### `GetAllDepartmentsAsync()`
- **Description**: Retrieves all departments.
- **Return Type**: `Task<IEnumerable<Department>>`
- **Returns**: Complete department list.

### `GetDepartmentByIdAsync(Guid id)`
- **Description**: Gets a department by ID.
- **Parameters**:
  - `id`: GUID of the department
- **Return Type**: `Task<Department?>`
- **Returns**: The department or `null`.

### `GetDepartmentsByNameAsync(string name)`
- **Description**: Searches departments by name.
- **Parameters**:
  - `name`: Department name (partial match)
- **Return Type**: `Task<IEnumerable<Department>>`
- **Returns**: Matching departments.

---

## Combined Query Methods

### `GetUsersByDepartmentAsync(Guid departmentId, Guid? courseId = null, Guid? enrollmentId = null)`
- **Description**: Gets users filtered by department (optionally by course/enrollment).
- **Parameters**:
  - `departmentId`: GUID of the department
  - `courseId` (optional): Narrow by course
  - `enrollmentId` (optional): Narrow by enrollment
- **Return Type**: `Task<IEnumerable<T>>`
- **Returns**: Users matching all specified criteria.

### `GetCoursesWithEnrolledUsersAsync(Guid courseId)`
- **Description**: Gets a course with its enrolled users.
- **Parameters**:
  - `courseId`: GUID of the course
- **Return Type**: `Task<IEnumerable<Course>>`
- **Returns**: Course(s) with populated `EnrolledUsers` property.