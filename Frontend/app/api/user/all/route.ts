export async function GET() {
  try {
    // Replace this with your actual API call to fetch users
    const response = await fetch("http://localhost:5168/api/Admin/users");
    const data = await response.json();
    console.log(data)
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
