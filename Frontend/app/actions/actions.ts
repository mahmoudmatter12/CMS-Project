export async function getTotalEnrolledSubjects({ id }: { id: string }) {
  const res = await fetch(
    `http://localhost:5168/api/Admin/enrollments/user/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch enrolled subjects");
  }
  const data = await res.json();
  const totalEnrolledSubjects = data.length;
  return { totalEnrolledSubjects };
}

export async function numberOfQuizzes() {
  const res = await fetch(`http://localhost:5168/api/Quiz/active`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  const data = await res.json();
  const totalQuizzes = data.length;
  return { totalQuizzes };
}