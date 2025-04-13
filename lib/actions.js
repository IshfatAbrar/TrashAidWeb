import { connectMongoDB } from "./mongodb";
import Trash from "./models/trash";

export async function getTrashCounts() {
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
    return {
      recyclable: recyclableCount,
      compost: compostCount,
      landfill: landfillCount,
      total: recyclableCount + compostCount + landfillCount,
    };
  } catch (error) {
    console.error("Error fetching trash counts:", error);
    // Return default values in case of error
    return {
      recyclable: 0,
      compost: 0,
      landfill: 0,
      total: 0,
    };
  }
}
