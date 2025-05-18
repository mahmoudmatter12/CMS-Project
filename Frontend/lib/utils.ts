import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Format time to readable string
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Format date and time to readable string
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Calculate time remaining until a deadline
export function getTimeRemaining(deadlineString: string): string {
  const now = new Date();
  const deadline = new Date(deadlineString);
  const diffMs = deadline.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Past due";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  } else {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} left`;
  }
}

// Calculate GPA color based on value
export function getGpaColor(gpa: number): string {
  if (gpa >= 3.5) return "text-green-500";
  if (gpa >= 3.0) return "text-blue-500";
  if (gpa >= 2.0) return "text-yellow-500";
  return "text-red-500";
}

// Generate initials from name
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function getQuizType(type: number): string {
  switch (type) {
    case 0:
      return "True/False";
    case 1:
      return "Multiple Choice";
    case 2:
      return "Short Answer";
    default:
      return "Unknown Type";
  }
}

// calc the dueDate by the start date and the end date
export function calcDueDate(
  startDateString: Date,
  endDateString: Date
): string {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return "Invalid date";
  }

  const diffMs = endDate.getTime() - startDate.getTime();

  if (diffMs < 0) {
    return "End date is before start date";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const daysPart =
    diffDays > 0 ? `${diffDays} day${diffDays > 1 ? "s" : ""}` : "";
  const hoursPart =
    diffHours > 0 ? `${diffHours} hour${diffHours > 1 ? "s" : ""}` : "";
  const minutesPart =
    diffMinutes > 0 ? `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}` : "";

  return [daysPart, hoursPart, minutesPart].filter(Boolean).join(", ");
}

// Generate initials for avatar fallback
export const getAvatarInitials = (name: string) => {
  if (!name || typeof name !== "string") return "";
  return name
    .split(" ")
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
};
