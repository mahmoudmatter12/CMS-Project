import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // Authenticate the request
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clerkClient();

    // Await the params and validate the student ID
    const { id: studentId } = await params;
    if (!studentId || typeof studentId !== "string") {
      return NextResponse.json(
        { error: "Invalid student ID" },
        { status: 400 }
      );
    }

    // Delete from your backend API
    const backendResponse = await fetch(`http://localhost:5168/${studentId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      throw new Error(errorData.message || "Failed to delete student from backend");
    }

    // Delete user from Clerk (if needed)
    try {
      await client.users.deleteUser(studentId);
    } catch (clerkError) {
      console.warn("User not found in Clerk or already deleted:", clerkError);
    }

    return NextResponse.json(
      { success: true, message: "Student deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in DELETE /api/students/[id]:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unknown error occurred";

    return NextResponse.json(
      { error: errorMessage },
      { 
        status: error instanceof Error && error.message.includes("Unauthorized") 
          ? 401 
          : 500 
      }
    );
  }
}

// Ensure this route is dynamically evaluated
export const dynamic = "force-dynamic";