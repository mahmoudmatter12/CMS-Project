export async function GET() {
  try {
    // Replace this with your actual API call to fetch departments
    const response = await fetch('http://localhost:5168/api/Department');
    console.log('Fetched departments:', response); 
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch departments' }), { status: 500 });
  }
}