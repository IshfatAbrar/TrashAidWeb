import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Trash from "@/lib/models/trash";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Count all trash types
    const recyclableCount = await Trash.countDocuments({
      trash: "recyclable",
    });
    const compostCount = await Trash.countDocuments({ trash: "compost" });
    const landfillCount = await Trash.countDocuments({ trash: "landfill" });

    // Return all counts
    return NextResponse.json(
      {
        recyclable: recyclableCount,
        compost: compostCount,
        landfill: landfillCount,
        total: recyclableCount + compostCount + landfillCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching trash counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch trash counts" },
      { status: 500 }
    );
  }
}
