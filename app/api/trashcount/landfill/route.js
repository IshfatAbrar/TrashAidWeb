import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Trash from "@/lib/models/trash";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Count landfill trash items
    const count = await Trash.countDocuments({ trash: "landfill" });

    // Return the count
    return NextResponse.json({ count, type: "landfill" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching landfill trash count:", error);
    return NextResponse.json(
      { error: "Failed to fetch landfill trash count" },
      { status: 500 }
    );
  }
}
