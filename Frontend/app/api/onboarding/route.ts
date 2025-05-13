import { NextResponse } from "next/server";
import { User, userLeve } from "@/types/types";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export async function POST(request: Request) {
  try {
    const userObject: User = await request.json();
    console.log("Received user object:", userObject);
    // Validate required fields
    if (
      !userObject.email ||
      !userObject.clerkId ||
      !userObject.studentCollageId ||
      !userObject.level
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate level
    if (!Object.values(userLeve).includes(userObject.level as userLeve)) {
      return NextResponse.json(
        { error: "Invalid user level" },
        { status: 400 }
      );
    }

    // save the role and the onboarding status to the user in Clerk
    const client = await clerkClient();
    await client.users.updateUser(userObject.clerkId, {
      publicMetadata: {
        IsBoarded: true,
        Role: userObject.role,
      },
    });

    // Save to your backend
    const response = await fetch(
      "http://localhost:5168/api/Auth/ClerkRegister",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObject),
      }
    );

    if (!response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errorData: any = {};
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData.message = await response.text();
      }
      return NextResponse.json(
        { error: errorData.message || "Failed to complete onboarding" },
        { status: response.status }
      );
    }
    const user = await client.users.getUser(userObject.clerkId);
    console.log("Onboarding successful:",  user);
    const data = await response.json();
    revalidatePath("/");
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Onboarding failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
