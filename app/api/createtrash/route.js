import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Trash from "@/lib/models/trash";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse the request body
    const body = await request.json();
    const { type } = body;

    // Validate that type is provided
    if (!type) {
      return NextResponse.json(
        { error: "Trash type is required" },
        { status: 400 }
      );
    }

    // Create a new trash document
    const trash = await Trash.create({
      trash: type,
    });

    // Return the created trash
    return NextResponse.json(
      { message: "Trash created successfully", trash },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating trash:", error);
    return NextResponse.json(
      { error: "Failed to create trash" },
      { status: 500 }
    );
  }
}
