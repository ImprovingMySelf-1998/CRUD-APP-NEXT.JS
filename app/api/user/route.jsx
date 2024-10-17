import { users } from "../route";

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('id');

  if (userId) {
    const user = users.find(user => user.id === Number(userId));

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export async function PUT(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('id');

  if (!userId) {
    return new Response(JSON.stringify({ message: "User ID is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const userIndex = users.findIndex(user => user.id === Number(userId));

  if (userIndex === -1) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  const requestData = await req.json();
  users[userIndex] = { ...users[userIndex], ...requestData };

  return new Response(JSON.stringify(users[userIndex]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
