import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Trash from "@/lib/models/trash";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Count compost trash items
    const count = await Trash.countDocuments({ trash: "compost" });

    // Return the count
    return NextResponse.json({ count, type: "compost" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching compost trash count:", error);
    return NextResponse.json(
      { error: "Failed to fetch compost trash count" },
      { status: 500 }
    );
  }
}
