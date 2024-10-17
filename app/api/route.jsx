import { NextResponse } from "next/server";

export let users = [];
let currentId = 1;

export async function GET() {
  try {
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users." }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { message: "Name, email, and phone are required!" },
        { status: 400 }
      );
    }

    const newUser = {
      id: currentId++,
      name: body.name,
      email: body.email,
      phone: body.phone,
    };

    users.push(newUser);

    return NextResponse.json(
      { message: "User added successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error adding user." }, { status: 500 });
  }
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get('id'));

  users = users.filter(item => item.id !== id);

  return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
