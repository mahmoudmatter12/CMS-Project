import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  try {
    const response = await fetch(`http://localhost:5168/api/Auth/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch current user:", response.statusText);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching current user:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch current user" }),
      { status: 500 }
    );
  }
}