import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Trash from "@/lib/models/trash";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Count recyclable trash items
    const count = await Trash.countDocuments({ trash: "recyclable" });

    // Return the count
    return NextResponse.json({ count, type: "recyclable" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recyclable trash count:", error);
    return NextResponse.json(
      { error: "Failed to fetch recyclable trash count" },
      { status: 500 }
    );
  }
}
